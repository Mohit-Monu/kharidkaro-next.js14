import { existsSync, mkdirSync } from "fs";
import { unlink, writeFile } from "fs/promises";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import {v4 as uuidv4} from 'uuid'
export const POST = async (req: NextRequest) => {
  const user = await getToken({ req });
  if(!user || user.role!=="seller"){
    return NextResponse.json({msg:"Not Authorized"},{status:401})
  }
  if (user) {
    const file = await req.formData();
    const image = file.get("image") as File;
    if (image) {
      const byteLength = await image.arrayBuffer();
      const bufferData = await Buffer.from(byteLength);
      if (!existsSync(`./public/images/${user.id}`)) {
        mkdirSync(`./public/images/${user.id}`, { recursive: true });
      }
      const pathOfFile = `./public/images/${user.id}/`;
      const fileName = `${uuidv4()}${path.extname(image.name)}`;
      await writeFile(pathOfFile + fileName, bufferData);
      return NextResponse.json({
        msg: "image upload successfully",
        Url: fileName,
      });
    }
  } else {
    return NextResponse.json({ msg: "Not Authorized" }, { status: 401 });
  }
};
export const DELETE = async (req: NextRequest) => {
  const user = await getToken({ req });
  if(!user || user.role!=="seller"){
    return NextResponse.json({msg:"Not Authorized"},{status:401})
  }
  if (user) {
    try{
      const imageName = req.nextUrl.searchParams.get("image");
      const imagePath = `./public/images/${user.id}/${imageName}`;
      if (existsSync(imagePath)) {
        await unlink(imagePath);
        return NextResponse.json({ msg: "image delete successfully" });
      }
    }catch{
      return NextResponse.json({ msg: "image not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
