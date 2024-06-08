import dbConnect from "@/lib/db"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import PRODUCTS from "@/models/product"
import { title } from "process"
export const GET=async(req:NextRequest)=>{
  const user=await getToken({req})
  if(!user || user.role!=="buyer"){
    return NextResponse.json({msg:"Not Authorized"},{status:401})
  }
  const query=req.nextUrl.searchParams.get("query")
  if(!query){
    return NextResponse.json({msg:"query is required"},{status:400})
  }
  try{

    await dbConnect()
    const products=await PRODUCTS.find({title:{$regex:query,$options:"i"}}).limit(10)
    return NextResponse.json({msg:"success",data:products},{status:200})
  }catch{
    return NextResponse.json({msg:"Something went wrong"},{status:500})
  }

}
