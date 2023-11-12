"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import Link from "next/link";


const query = gql`
  {
    transactions(
      tags: [
        { name: "App-Name", values: ["SmartWeaveContract"] }
        { name: "Collection-Code", values: ["mfer-collection"] }
      ]
    ) {
      edges {
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }
`;

export default function Page() {

  const { data }: { data: any } = useSuspenseQuery(query);

  // console.log(data.transactions.edges[1].node);
  return (<div className=" border-red-500 flex flex-col ">
    {
    data ? (
      <main className="bg-black">

        <div className="flex  flex-wrap  justify-center py-4  gap-8">
          {data.transactions.edges.map((e:any)=>{
            return (
            <a href={`view-asset`} onClick={()=>{localStorage.setItem("atomic_asset_id",`${e.node.id}`)}} className="hover:cursor-pointer hover:bg-gray-900  bg-gray-800 justify-center rounded-md p-4 w-[40%] flex gap-8 border-red-400" key = {e.node.id}>
              <img className=" h-56 object-cover rounded-md" src={`https://arweave.net/${e.node.id}`}/>

              <div className="flex flex-col  justify-center text-xl">
              <div className="">{e.node.tags[7].value}
              </div>
              </div>
              {/* </div> */}
              </a>
            )
              
          })}

        </div>
      </main>
    ) : (
      <div></div>
    )
  }
</div>)
}
