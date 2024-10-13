import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/shared/DashboardComponent'),
  { ssr: false }
)

export default function page(){
  return(
    <div> 
      <DynamicComponentWithNoSSR />
    </div>
  )
}