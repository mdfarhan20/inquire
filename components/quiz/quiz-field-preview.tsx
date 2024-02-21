"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function QuizFieldPreview() {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-4 items-center">
        <Input 
          name="question"
          placeholder="Question"
          defaultValue={ "Untitled Question" }
          autoComplete="off"
        />

        <div className="flex items-center mt-6">
          <Label htmlFor="points">Points</Label>
          <input 
            type="number" 
            name="points"
            min={0}
            defaultValue={0}
          />
        </div>
      </CardHeader>
      <CardContent>
        <h1>Hi</h1>

      </CardContent>
      <CardFooter>
        <h1>Footer</h1>
      </CardFooter>
    </Card>
  )
}