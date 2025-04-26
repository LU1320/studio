'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // Simulate form submission
    console.log("Form submitted:", values);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // TODO: Replace with actual API call to send the message
    try {
      // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(values) });
      // if (!response.ok) throw new Error('Network response was not ok');

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset(); // Reset form on success
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Submission Error",
        description: "Could not send your message. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Get In Touch</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Have questions, suggestions, or just want to say hi? We'd love to hear from you!
        </p>
      </section>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is your message about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write your message here..." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 md:w-auto">
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Information & Socials */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <MailIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:support@pawsomeoutfits.com" className="text-sm text-muted-foreground hover:text-primary">
                    support@pawsomeoutfits.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PhoneIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <span className="text-sm text-muted-foreground">(123) 456-7890</span> {/* Replace with actual number if available */}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPinIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <span className="text-sm text-muted-foreground">123 Pawsome St, Dogville, CA 90210</span> {/* Replace with actual address or remove */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="mb-4 text-sm text-muted-foreground">Connect with us on social media for cute pup pics and updates!</p>
               <div className="flex gap-6">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                </Link>
                 <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                   <TwitterIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                 </Link>
                 {/* Add other social media links (TikTok, etc.) */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
