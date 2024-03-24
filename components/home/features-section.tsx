import { Divider } from "../ui/divider"


export const features = [
  { title: "Simple UI", description: "The User Interface is designed to be simple to use for anyone looking to build their own forms and quizzes or even host their own polls" },
  { title: "Easy Sharing", description: "The User's creations can be easily shared through a link that will be provided immediately after the creation of the forms, quizzes or polls" },
  { title: "Secure Authentication", description: "We have provided many different authentication methods such as Google and Github OAuth and a custom username and password login with high security" },
  { title: "Ease of Access", description: "Once a link of a form or quiz or poll is sent to you. You can click the link the easily fill out the form, attempt the quiz or vote on the poll." },
  { title: "Responses", description: "The creator of the form or poll or quiz can easily view and monitor the responses on their inquire creation using the response page provided." },
  { title: "Dashboard", description: "Every user is provided with a dashboard from where they can view and manage all of their Inquire creations easily." },
]

export default function Features() {
  return (
    <section className="flex flex-col items-center gap-4 mt-4">
      <h2 
        className="border-b-2 border-primary text-secondary-foreground text-3xl w-fit pb-2 mb-4"
      >Features</h2>
      <div className="grid gap-6 max-w-90 sm:grid-cols-2 md:grid-cols-3 lg:gap-14 lg:w-4/5">
        { features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        )) }

      </div>
    </section>
  )
}

interface FeatureCardProps {
  title: string,
  description: string
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="grid text-center border-secondary-foreground border-1 rounded-md">
      <h3 className="px-4 py-2 text-xl font-thin tracking-wider uppercase">{title}</h3>
      <Divider className="border-secondary-foreground" />
      <p className="px-4 py-6 text-sm">{description}</p>
    </div>
  )
}