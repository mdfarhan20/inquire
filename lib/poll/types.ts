
export type PollData = {
  title: string,
  body?: string,
  options: string[]
}

export type PollState = {
  success: boolean,
  message?: string,
  pollId?: string
}