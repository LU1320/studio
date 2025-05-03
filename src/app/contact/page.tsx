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
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from 'lucide-react'; // Added SendIcon
import { PawPrintIcon } from '@/components/icons/paw-print-icon'; // Use PawPrintIcon
import Image from 'next/image'; // Import Image for map placeholder
import Link from 'next/link'; // Keep Link for social media
import { useState } from 'react'; // Added useState

// Playful icons for form fields (Example using inline SVGs or Lucide if suitable)
const NameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const EmailIcon = MailIcon; // Reuse MailIcon
const SubjectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 14 4-4"/><path d="M10 20v-4.5a3.5 3.5 0 0 1 7 0V20"/><path d="M6 20v-1.5a3.5 3.5 0 0 1 7 0V20"/><path d="M18 8v5a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3z"/></svg>; // Bone shape?
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; // Speech bubble

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Tu nombre debe tener al menos 2 letras." }),
  email: z.string().email({ message: "Por favor, ingresa un email válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 letras." }),
  message: z.string().min(10, { message: "Tu mensaje debe tener al menos 10 letras." }),
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

  const [isLoading, setIsLoading] = useState(false); // Add loading state

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log("Formulario enviado:", values);
    setIsLoading(true); // Set loading state
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    try {
      // TODO: Replace with actual API call
      toast({
        title: "¡Mensaje Recibido!",
        description: "¡Gracias por contactarnos! Te responderemos con mucha ternura pronto.",
      });
      form.reset();
    } catch (error) {
      console.error("Fallo al enviar mensaje:", error);
      toast({
        title: "Error de Envío",
        description: "No pudimos enviar tu mensaje. Intenta de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false); // Reset loading state
    }
  }




  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
         <PawPrintIcon className="mx-auto mb-4 h-12 w-12 text-primary drop-shadow-lg" />
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">¡Hablemos!</h1> {/* Playful Title */}
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          ¿Preguntas, ideas o solo quieres saludar? ¡Nos encanta saber de ti y de tu Pawsome Pal!
        </p>
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5"> {/* Adjusted grid layout */}

        {/* Contact Form */}
        <Card className="lg:col-span-3"> {/* Form takes more space */}
          <CardHeader>
            <CardTitle className="text-2xl">Envíanos un Mensaje Peludo</CardTitle> {/* Playful Title */}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><NameIcon /> Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu Nombre" {...field} />
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
                       <FormLabel className="flex items-center gap-2"><EmailIcon className="h-4 w-4 text-primary"/> Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu.email@ejemplo.com" {...field} />
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
                       <FormLabel className="flex items-center gap-2"><SubjectIcon /> Asunto</FormLabel>
                      <FormControl>
                        <Input placeholder="¿Sobre qué quieres hablar?" {...field} />
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
                       <FormLabel className="flex items-center gap-2"><MessageIcon /> Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Escribe tu mensaje aquí con mucha ternura..." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading ? 'Enviando...' : <>Enviar Mensaje <SendIcon className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Information & Map */}
        <div className="space-y-8 lg:col-span-2"> {/* Info/Map takes less space */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Info de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <PawPrintIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:hola@petcouture.com" className="text-sm text-muted-foreground hover:text-primary">
                    hola@petcouture.com {/* Updated email */}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <PawPrintIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Teléfono</h4>
                  <span className="text-sm text-muted-foreground">(555) TERNURA</span> {/* Playful number */}
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <PawPrintIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Dirección</h4>
                  <span className="text-sm text-muted-foreground">123 Calle Pawsome, Ciudad Peluda, CP 90210</span> {/* Playful Address */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
             <CardHeader>
               <CardTitle className="text-2xl">Encuéntranos</CardTitle>
             </CardHeader>
             <CardContent>
                 <p className="mb-4 text-sm text-muted-foreground">¡Ven a visitarnos si tienes una tienda física!</p>
                 <div className="relative h-64 w-full overflow-hidden rounded-lg border">
                     {/* Replace with actual map component or iframe */}
                     <Image
                        src="https://picsum.photos/seed/pawsomemap/600/400" // Placeholder map image
                        alt="Mapa de ubicación de la tienda"
                        layout="fill"
                        objectFit="cover"
                         data-ai-hint="map with paw prints" // AI hint
                    />
                     {/* You can overlay paw prints here if desired */}
                 </div>
             </CardContent>
          </Card>

           {/* Socials can be moved here or stay in footer */}

        </div>
      </div>
    </div>
  );
}
