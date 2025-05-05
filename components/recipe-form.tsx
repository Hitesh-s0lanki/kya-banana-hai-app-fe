"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import { useState } from "react";
import Loading from "./loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { RecipeSchema } from "@/schema/index.schema";
import { z } from "zod";
import { useCreateRecipe } from "@/actions/recipe/features";

const formSchema = RecipeSchema;
type formSchemaType = z.infer<typeof formSchema>;

const RecipeForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const mutation = useCreateRecipe();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: formSchemaType) => {
    setLoading(true);
    mutation
      .mutateAsync(values)
      .then((id) => {
        router.push(`/recipe/${id}`);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Card className=" bg-white">
      <CardHeader>
        <CardTitle>Generate Recipe</CardTitle>
        <CardDescription>ek naya swadisht anubhav banate hai.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-3 justify-between h-full">
            <div className=" flex flex-col gap-2">
              <div className=" w-full flex flex-col gap-2">
                <h1 className=" text-muted-foreground font-semibold text-sm">
                  Select Cuisine Type
                </h1>
                <div className=" w-full flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="type.veg"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Veg</FormLabel>
                          <Image
                            src="/veg.svg"
                            alt="veg"
                            height={18}
                            width={18}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type.non_veg"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Non-Veg</FormLabel>
                          <Image
                            src="/non_veg.svg"
                            alt="veg"
                            height={18}
                            width={18}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type.vegan"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Vegan</FormLabel>
                          <Image
                            src="/vegan.svg"
                            alt="vega"
                            height={18}
                            width={18}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type.eggs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Eggs</FormLabel>
                          <Image
                            src="/eggs.svg"
                            alt="Eggs"
                            height={18}
                            width={18}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className=" w-full flex flex-col gap-2">
                <h1 className="text-muted-foreground font-semibold text-sm">
                  Select Meal Type
                </h1>

                <div className="w-full flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="meal.breakfast"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Breakfast</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="meal.lunch"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Lunch</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="meal.dinner"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Dinner</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="meal.snacks"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Snacks</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className=" w-full flex flex-col gap-2">
                <h1 className="text-muted-foreground font-semibold text-sm">
                  Select Preferenes
                </h1>
                <div className="flex flex-row gap-2 flex-wrap w-2/3">
                  <FormField
                    control={form.control}
                    name="preferenes.rajasthani"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Rajasthani</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferenes.gujarati"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Gujarati</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferenes.punjabi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Punjabi</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferenes.south_indian"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>South Indian</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferenes.chinese"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Chinese</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferenes.italian"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Italian</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferenes.mexican"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Mexican</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className=" w-full flex flex-col gap-2">
                <h1 className="text-muted-foreground font-semibold text-sm">
                  Select Preferenes Taste
                </h1>
                <div className="flex flex-row gap-2 flex-wrap w-2/3">
                  <FormField
                    control={form.control}
                    name="preferences_taste.spicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Spicy</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferences_taste.sweet"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Sweet</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferences_taste.savory"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Savory</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferences_taste.sour"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none flex gap-1 items-center">
                          <FormLabel>Sour</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className=" w-full flex flex-col gap-2">
                <h1 className="text-muted-foreground font-semibold text-sm">
                  Enter your Opinion
                </h1>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="py-2">
              <Button
                className=" flex gap-2 items-center px-8"
                type="submit"
                size="sm">
                Create
                <Image src="/star.svg" alt="AI" height={18} width={18} />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;
