import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/shared/TodoComponent'),
  { ssr: false }
)

export default function page(){
  return(
    <div> 
      <DynamicComponentWithNoSSR />
    </div>
  )
}