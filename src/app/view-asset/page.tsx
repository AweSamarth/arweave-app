"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
export default function Page() {

 const [theId, setTheId] = useState<string | null>()
  const searchParams = useSearchParams()
    useEffect(()=>{
        async function something(){
        setTheId(localStorage.getItem("atomic_asset_id"))
        console.log(theId)
        }        
    
        something()
    },[theId])
    

    if(theId){

        const { data }: { data: any } = useSuspenseQuery(
            gql`
          {
            transaction(id:"${theId}" ) {
            id
            tags {
              name
              value
            }
          }
          }
        `
          );
        
        
          return (
          
          
        
              <main className="bg-slate-950  min-h-screen flex flex-col justify-center content-center">
                <div className=" bg-slate-700 rounded-md flex justify-around  mx-24  gap-4 px-4 py-3">
                    <img className="w-[40%] object-cover rounded-md"  src={`https://arweave.net/${theId}`} />
                    <div className="  text-lg flex min-w-[50%] py-4  flex-col gap-9 justify-center">
                        <div>Name: {(data.transaction.tags.find((tag: { name: string; })=>tag.name==="Title").value)}</div>
                        <div>Description: {(data.transaction.tags.find((tag: { name: string; })=>tag.name==="Description").value)}</div>
                        <div>Collection code: {(data.transaction.tags.find((tag: { name: string; })=>tag.name==="Collection-Code").value)}</div>
                        <div>Created by: <a className=" text-blue-700" href={`https://viewblock.io/arweave/address/${data.transaction.tags.find((tag: { name: string; })=>tag.name==="Creator").value}`}>{(data.transaction.tags.find((tag: { name: string; })=>tag.name==="Creator").value)}</a></div>
                        <div>Content Type: {(data.transaction.tags.find((tag: { name: string; })=>tag.name==="Content-Type").value)}</div>
                        <div>Contract Source: <a className="text-blue-700" href={`https://arweave.net/${(data.transaction.tags.find((tag: { name: string; })=>tag.name==="Contract-Src").value)}`}>{(data.transaction.tags.find((tag: { name: string; })=>tag.name==="Contract-Src").value)}</a></div>
                        <div>License: <a className="text-blue-700" href={`https://arweave.net/${(data.transaction.tags.find((tag: { name: string; })=>tag.name==="License").value)}`}>{(data.transaction.tags.find((tag: { name: string; })=>tag.name==="License").value)}</a></div>
                        <div>License Fee: {(data.transaction.tags.find((tag: { name: string; })=>tag.name==="License-Fee").value)}</div>
                        </div>
                    </div>
              </main>
            
          
        )


    }

    else{
        const { data }: { data: any } = useSuspenseQuery(
            gql`
          {
            transaction(id:"${theId}" ) {
            id
            tags {
              name
              value
            }
          }
          }
        `
          )
        return(<main>loading...</main>)

    }

}


