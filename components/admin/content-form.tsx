"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, PlusCircle, MinusCircle } from "lucide-react"
import type { IStaticContent } from "@/lib/types"

const staticContentSchema = z.object({
  festivalName: z.string().min(1, "Festival name is required"),
  festivalDates: z.string().min(1, "Festival dates are required"),
  festivalLocation: z.string().min(1, "Festival location is required"),
  heroSubtitle: z.string().min(1, "Hero subtitle is required"),
  stats: z.object({
    eventsCount: z.string().min(1, "Events count is required"),
    eventsLabel: z.string().min(1, "Events label is required"),
    celebrationDuration: z.string().min(1, "Celebration duration is required"),
    celebrationLabel: z.string().min(1, "Celebration label is required"),
    participantsCount: z.string().min(1, "Participants count is required"),
    participantsLabel: z.string().min(1, "Participants label is required"),
  }),
  aboutTitle: z.string().min(1, "About title is required"),
  aboutDescription: z.string().min(1, "About description is required"),
  aboutFeatures: z.array(
    z.object({
      title: z.string().min(1, "Feature title is required"),
      subtitle: z.string().min(1, "Feature subtitle is required"),
      description: z.string().min(1, "Feature description is required"),
      gradient: z.string().min(1, "Feature gradient is required"),
    }),
  ),
  eventsTitle: z.string().min(1, "Events title is required"),
  registerTitle: z.string().min(1, "Register title is required"),
  registerDescription: z.string().min(1, "Register description is required"),
  registerFormTitle: z.string().min(1, "Register form title is required"),
  registerFormDescription: z.string().min(1, "Register form description is required"),
  registerButtonText: z.string().min(1, "Register button text is required"),
  registerDisclaimer: z.string().min(1, "Register disclaimer is required"),
  eventRegistrationFormUrl: z.string().url("Must be a valid URL for event registration"),
  volunteerTitle: z.string().min(1, "Volunteer title is required"),
  volunteerDescription: z.string().min(1, "Volunteer description is required"),
  volunteerFormTitle: z.string().min(1, "Volunteer form title is required"),
  volunteerFormDescription: z.string().min(1, "Volunteer form description is required"),
  volunteerButtonText: z.string().min(1, "Volunteer button text is required"),
  volunteerDisclaimer: z.string().min(1, "Volunteer disclaimer is required"),
  volunteerRegistrationFormUrl: z.string().url("Must be a valid URL for volunteer registration"),
  committeeTitle: z.string().min(1, "Committee title is required"),
  committeeDescription: z.string().min(1, "Committee description is required"),
  footerDescription: z.string().min(1, "Footer description is required"),
  footerQuickLinks: z.array(z.string().min(1, "Quick link cannot be empty")),
  footerEventInfo: z.object({
    date: z.string().min(1, "Event info date is required"),
    location: z.string().min(1, "Event info location is required"),
    phone: z.string().min(1, "Event info phone is required"),
  }),
  socialMediaLinks: z.object({
    instagram: z.string().url("Must be a valid Instagram URL").or(z.literal("")),
    facebook: z.string().url("Must be a valid Facebook URL").or(z.literal("")),
    twitter: z.string().url("Must be a valid Twitter URL").or(z.literal("")),
  }),
  copyrightText: z.string().min(1, "Copyright text is required"),
})

interface ContentFormProps {
  onSubmit: (data: IStaticContent) => void
  initialData: IStaticContent | null
}

export function ContentForm({ onSubmit, initialData }: ContentFormProps) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IStaticContent>({
    resolver: zodResolver(staticContentSchema),
    defaultValues: initialData || {
      festivalName: "VARNAVE'25",
      festivalDates: "September 12-13, 2025",
      festivalLocation: "Coimbatore",
      heroSubtitle: "Cultural Festival • September 12-13, 2025 • Coimbatore",
      stats: {
        eventsCount: "20+",
        eventsLabel: "Events",
        celebrationDuration: "3 Days",
        celebrationLabel: "Celebration",
        participantsCount: "5000+",
        participantsLabel: "Participants",
      },
      aboutTitle: "ABOUT VARNAVE'25",
      aboutDescription:
        "Varnave'25 is the premier cultural festival celebrating the rich heritage of Tamil arts, cinema, music, and performing arts. Join us for three days of extraordinary performances, competitions, and cultural immersion in the heart of Coimbatore.",
      aboutFeatures: [
        {
          title: "3 DAYS",
          subtitle: "OF CELEBRATION",
          description: "Non-stop entertainment with 30+ events across multiple categories",
          gradient: "from-blue-500 to-purple-500",
        },
        {
          title: "₹1 LAKH+",
          subtitle: "PRIZE MONEY",
          description: "Exciting cash prizes and recognition for winners",
          gradient: "from-orange-500 to-yellow-500",
        },
        {
          title: "5000+",
          subtitle: "PARTICIPANTS",
          description: "Students from across Tamil Nadu and beyond",
          gradient: "from-pink-500 to-red-500",
        },
      ],
      eventsTitle: "EVENTS & COMPETITIONS",
      registerTitle: "REGISTER NOW",
      registerDescription: "Secure your spot at the grandest Tamil cultural celebration",
      registerFormTitle: "EVENT REGISTRATION",
      registerFormDescription: "Register for events and competitions via Google Forms.",
      registerButtonText: "REGISTER VIA GOOGLE FORM",
      registerDisclaimer: "Click the button to proceed to the Google Form for registration.",
      eventRegistrationFormUrl: "https://forms.gle/YourEventRegistrationFormLink",
      volunteerTitle: "BE A VOLUNTEER",
      volunteerDescription: "Join our dedicated team and help make Varnave'25 a grand success!",
      volunteerFormTitle: "VOLUNTEER REGISTRATION",
      volunteerFormDescription: "Contribute to the festival and gain valuable experience.",
      volunteerButtonText: "APPLY TO VOLUNTEER",
      volunteerDisclaimer: "Applications close September 1, 2025",
      volunteerRegistrationFormUrl: "https://forms.gle/YourVolunteerFormLink",
      committeeTitle: "CORE COMMITTEE",
      committeeDescription: "Meet the dedicated team behind Varnave'25",
      footerDescription: "The premier Tamil cultural festival celebrating arts, cinema, music, and performing arts.",
      footerQuickLinks: ["About", "Events", "Register", "Volunteer", "Contact"],
      footerEventInfo: {
        date: "September 12-13, 2025",
        location: "Coimbatore, Tamil Nadu",
        phone: "+91 98765 43210",
      },
      socialMediaLinks: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
      },
      copyrightText: "© 2025 Varnave. All rights reserved. Made with ❤️ for Tamil culture.",
    },
  })

  const {
    fields: aboutFeaturesFields,
    append: appendAboutFeature,
    remove: removeAboutFeature,
  } = useFieldArray({
    control,
    name: "aboutFeatures",
  })

  const {
    fields: footerQuickLinksFields,
    append: appendFooterQuickLink,
    remove: removeFooterQuickLink,
  } = useFieldArray({
    control,
    name: "footerQuickLinks",
  })

  const onSubmitHandler = async (data: IStaticContent) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8 p-4">
      {/* General Info */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          General Festival Information
        </h3>
        <div>
          <Label htmlFor="festivalName" className="text-white/90">
            Festival Name
          </Label>
          <Input
            id="festivalName"
            {...register("festivalName")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.festivalName && <p className="text-red-400 text-sm mt-1">{errors.festivalName.message}</p>}
        </div>
        <div>
          <Label htmlFor="festivalDates" className="text-white/90">
            Festival Dates
          </Label>
          <Input
            id="festivalDates"
            {...register("festivalDates")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.festivalDates && <p className="text-red-400 text-sm mt-1">{errors.festivalDates.message}</p>}
        </div>
        <div>
          <Label htmlFor="festivalLocation" className="text-white/90">
            Festival Location
          </Label>
          <Input
            id="festivalLocation"
            {...register("festivalLocation")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.festivalLocation && <p className="text-red-400 text-sm mt-1">{errors.festivalLocation.message}</p>}
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          Hero Section
        </h3>
        <div>
          <Label htmlFor="heroSubtitle" className="text-white/90">
            Hero Subtitle
          </Label>
          <Input
            id="heroSubtitle"
            {...register("heroSubtitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.heroSubtitle && <p className="text-red-400 text-sm mt-1">{errors.heroSubtitle.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stats.eventsCount" className="text-white/90">
              Events Count
            </Label>
            <Input
              id="stats.eventsCount"
              {...register("stats.eventsCount")}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
            />
            {errors.stats?.eventsCount && (
              <p className="text-red-400 text-sm mt-1">{errors.stats.eventsCount.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="stats.eventsLabel" className="text-white/90">
              Events Label
            </Label>
            <Input
              id="stats.eventsLabel"
              {...register("stats.eventsLabel")}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
            />
            {errors.stats?.eventsLabel && (
              <p className="text-red-400 text-sm mt-1">{errors.stats.eventsLabel.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="stats.celebrationDuration" className="text-white/90">
              Celebration Duration
            </Label>
            <Input
              id="stats.celebrationDuration"
              {...register("stats.celebrationDuration")}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
            />
            {errors.stats?.celebrationDuration && (
              <p className="text-red-400 text-sm mt-1">{errors.stats.celebrationDuration.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="stats.celebrationLabel" className="text-white/90">
              Celebration Label
            </Label>
            <Input
              id="stats.celebrationLabel"
              {...register("stats.celebrationLabel")}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
            />
            {errors.stats?.celebrationLabel && (
              <p className="text-red-400 text-sm mt-1">{errors.stats.celebrationLabel.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="stats.participantsCount" className="text-white/90">
              Participants Count
            </Label>
            <Input
              id="stats.participantsCount"
              {...register("stats.participantsCount")}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
            />
            {errors.stats?.participantsCount && (
              <p className="text-red-400 text-sm mt-1">{errors.stats.participantsCount.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="stats.participantsLabel" className="text-white/90">
              Participants Label
            </Label>
            <Input
              id="stats.participantsLabel"
              {...register("stats.participantsLabel")}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
            />
            {errors.stats?.participantsLabel && (
              <p className="text-red-400 text-sm mt-1">{errors.stats.participantsLabel.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          About Section
        </h3>
        <div>
          <Label htmlFor="aboutTitle" className="text-white/90">
            About Title
          </Label>
          <Input
            id="aboutTitle"
            {...register("aboutTitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.aboutTitle && <p className="text-red-400 text-sm mt-1">{errors.aboutTitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="aboutDescription" className="text-white/90">
            About Description
          </Label>
          <Textarea
            id="aboutDescription"
            {...register("aboutDescription")}
            rows={3}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.aboutDescription && <p className="text-red-400 text-sm mt-1">{errors.aboutDescription.message}</p>}
        </div>

        <h4 className="text-xl font-bold text-white/90 mt-6">About Features</h4>
        {aboutFeaturesFields.map((field, index) => (
          <div key={field.id} className="border border-white/10 p-4 rounded-lg space-y-3 relative">
            <h5 className="text-lg font-semibold text-white/80">Feature {index + 1}</h5>
            <div>
              <Label htmlFor={`aboutFeatures.${index}.title`} className="text-white/90">
                Title
              </Label>
              <Input
                id={`aboutFeatures.${index}.title`}
                {...register(`aboutFeatures.${index}.title`)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
              />
              {errors.aboutFeatures?.[index]?.title && (
                <p className="text-red-400 text-sm mt-1">{errors.aboutFeatures[index]?.title?.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor={`aboutFeatures.${index}.subtitle`} className="text-white/90">
                Subtitle
              </Label>
              <Input
                id={`aboutFeatures.${index}.subtitle`}
                {...register(`aboutFeatures.${index}.subtitle`)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
              />
              {errors.aboutFeatures?.[index]?.subtitle && (
                <p className="text-red-400 text-sm mt-1">{errors.aboutFeatures[index]?.subtitle?.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor={`aboutFeatures.${index}.description`} className="text-white/90">
                Description
              </Label>
              <Textarea
                id={`aboutFeatures.${index}.description`}
                {...register(`aboutFeatures.${index}.description`)}
                rows={2}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
              />
              {errors.aboutFeatures?.[index]?.description && (
                <p className="text-red-400 text-sm mt-1">{errors.aboutFeatures[index]?.description?.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor={`aboutFeatures.${index}.gradient`} className="text-white/90">
                Gradient Class (e.g., from-blue-500 to-purple-500)
              </Label>
              <Input
                id={`aboutFeatures.${index}.gradient`}
                {...register(`aboutFeatures.${index}.gradient`)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
              />
              {errors.aboutFeatures?.[index]?.gradient && (
                <p className="text-red-400 text-sm mt-1">{errors.aboutFeatures[index]?.gradient?.message}</p>
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeAboutFeature(index)}
              className="absolute top-4 right-4"
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            appendAboutFeature({ title: "", subtitle: "", description: "", gradient: "from-gray-500 to-gray-600" })
          }
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Feature
        </Button>
      </div>

      {/* Events Section */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          Events Section
        </h3>
        <div>
          <Label htmlFor="eventsTitle" className="text-white/90">
            Events Title
          </Label>
          <Input
            id="eventsTitle"
            {...register("eventsTitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.eventsTitle && <p className="text-red-400 text-sm mt-1">{errors.eventsTitle.message}</p>}
        </div>
      </div>

      {/* Registration Section */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          Registration Section
        </h3>
        <div>
          <Label htmlFor="registerTitle" className="text-white/90">
            Register Title
          </Label>
          <Input
            id="registerTitle"
            {...register("registerTitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.registerTitle && <p className="text-red-400 text-sm mt-1">{errors.registerTitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="registerDescription" className="text-white/90">
            Register Description
          </Label>
          <Textarea
            id="registerDescription"
            {...register("registerDescription")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.registerDescription && (
            <p className="text-red-400 text-sm mt-1">{errors.registerDescription.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="registerFormTitle" className="text-white/90">
            Register Form Title
          </Label>
          <Input
            id="registerFormTitle"
            {...register("registerFormTitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.registerFormTitle && <p className="text-red-400 text-sm mt-1">{errors.registerFormTitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="registerFormDescription" className="text-white/90">
            Register Form Description
          </Label>
          <Textarea
            id="registerFormDescription"
            {...register("registerFormDescription")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.registerFormDescription && (
            <p className="text-red-400 text-sm mt-1">{errors.registerFormDescription.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="registerButtonText" className="text-white/90">
            Register Button Text
          </Label>
          <Input
            id="registerButtonText"
            {...register("registerButtonText")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.registerButtonText && (
            <p className="text-red-400 text-sm mt-1">{errors.registerButtonText.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="registerDisclaimer" className="text-white/90">
            Register Disclaimer
          </Label>
          <Textarea
            id="registerDisclaimer"
            {...register("registerDisclaimer")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.registerDisclaimer && (
            <p className="text-red-400 text-sm mt-1">{errors.registerDisclaimer.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="eventRegistrationFormUrl" className="text-white/90">
            Event Registration Google Form URL
          </Label>
          <Input
            id="eventRegistrationFormUrl"
            {...register("eventRegistrationFormUrl")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.eventRegistrationFormUrl && (
            <p className="text-red-400 text-sm mt-1">{errors.eventRegistrationFormUrl.message}</p>
          )}
        </div>
      </div>

      {/* Volunteer Section */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          Volunteer Section
        </h3>
        <div>
          <Label htmlFor="volunteerTitle" className="text-white/90">
            Volunteer Title
          </Label>
          <Input
            id="volunteerTitle"
            {...register("volunteerTitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.volunteerTitle && <p className="text-red-400 text-sm mt-1">{errors.volunteerTitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="volunteerDescription" className="text-white/90">
            Volunteer Description
          </Label>
          <Textarea
            id="volunteerDescription"
            {...register("volunteerDescription")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.volunteerDescription && (
            <p className="text-red-400 text-sm mt-1">{errors.volunteerDescription.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="volunteerFormTitle" className="text-white/90">
            Volunteer Form Title
          </Label>
          <Input
            id="volunteerFormTitle"
            {...register("volunteerFormTitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.volunteerFormTitle && (
            <p className="text-red-400 text-sm mt-1">{errors.volunteerFormTitle.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="volunteerFormDescription" className="text-white/90">
            Volunteer Form Description
          </Label>
          <Textarea
            id="volunteerFormDescription"
            {...register("volunteerFormDescription")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.volunteerFormDescription && (
            <p className="text-red-400 text-sm mt-1">{errors.volunteerFormDescription.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="volunteerButtonText" className="text-white/90">
            Volunteer Button Text
          </Label>
          <Input
            id="volunteerButtonText"
            {...register("volunteerButtonText")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.volunteerButtonText && (
            <p className="text-red-400 text-sm mt-1">{errors.volunteerButtonText.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="volunteerDisclaimer" className="text-white/90">
            Volunteer Disclaimer
          </Label>
          <Textarea
            id="volunteerDisclaimer"
            {...register("volunteerDisclaimer")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.volunteerDisclaimer && (
            <p className="text-red-400 text-sm mt-1">{errors.volunteerDisclaimer.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="volunteerRegistrationFormUrl" className="text-white/90">
            Volunteer Registration Google Form URL
          </Label>
          <Input
            id="volunteerRegistrationFormUrl"
            {...register("volunteerRegistrationFormUrl")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.volunteerRegistrationFormUrl && (
            <p className="text-red-400 text-sm mt-1">{errors.volunteerRegistrationFormUrl.message}</p>
          )}
        </div>
      </div>

      {/* Core Committee Section */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          Core Committee Section
        </h3>
        <div>
          <Label htmlFor="committeeTitle" className="text-white/90">
            Committee Title
          </Label>
          <Input
            id="committeeTitle"
            {...register("committeeTitle")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.committeeTitle && <p className="text-red-400 text-sm mt-1">{errors.committeeTitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="committeeDescription" className="text-white/90">
            Committee Description
          </Label>
          <Textarea
            id="committeeDescription"
            {...register("committeeDescription")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.committeeDescription && (
            <p className="text-red-400 text-sm mt-1">{errors.committeeDescription.message}</p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="space-y-4 border-b border-white/20 pb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          Footer Section
        </h3>
        <div>
          <Label htmlFor="footerDescription" className="text-white/90">
            Footer Description
          </Label>
          <Textarea
            id="footerDescription"
            {...register("footerDescription")}
            rows={2}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.footerDescription && <p className="text-red-400 text-sm mt-1">{errors.footerDescription.message}</p>}
        </div>

        <h4 className="text-xl font-bold text-white/90 mt-6">Footer Quick Links</h4>
        {footerQuickLinksFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              id={`footerQuickLinks.${index}`}
              {...register(`footerQuickLinks.${index}`)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20 flex-grow"
            />
            <Button type="button" variant="destructive" size="sm" onClick={() => removeFooterQuickLink(index)}>
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendFooterQuickLink("")}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Quick Link
        </Button>

        <h4 className="text-xl font-bold text-white/90 mt-6">Footer Event Info</h4>
        <div>
          <Label htmlFor="footerEventInfo.date" className="text-white/90">
            Event Info Date
          </Label>
          <Input
            id="footerEventInfo.date"
            {...register("footerEventInfo.date")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.footerEventInfo?.date && (
            <p className="text-red-400 text-sm mt-1">{errors.footerEventInfo.date.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="footerEventInfo.location" className="text-white/90">
            Event Info Location
          </Label>
          <Input
            id="footerEventInfo.location"
            {...register("footerEventInfo.location")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.footerEventInfo?.location && (
            <p className="text-red-400 text-sm mt-1">{errors.footerEventInfo.location.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="footerEventInfo.phone" className="text-white/90">
            Event Info Phone
          </Label>
          <Input
            id="footerEventInfo.phone"
            {...register("footerEventInfo.phone")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.footerEventInfo?.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.footerEventInfo.phone.message}</p>
          )}
        </div>

        <h4 className="text-xl font-bold text-white/90 mt-6">Social Media Links</h4>
        <div>
          <Label htmlFor="socialMediaLinks.instagram" className="text-white/90">
            Instagram URL
          </Label>
          <Input
            id="socialMediaLinks.instagram"
            {...register("socialMediaLinks.instagram")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.socialMediaLinks?.instagram && (
            <p className="text-red-400 text-sm mt-1">{errors.socialMediaLinks.instagram.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="socialMediaLinks.facebook" className="text-white/90">
            Facebook URL
          </Label>
          <Input
            id="socialMediaLinks.facebook"
            {...register("socialMediaLinks.facebook")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.socialMediaLinks?.facebook && (
            <p className="text-red-400 text-sm mt-1">{errors.socialMediaLinks.facebook.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="socialMediaLinks.twitter" className="text-white/90">
            Twitter URL
          </Label>
          <Input
            id="socialMediaLinks.twitter"
            {...register("socialMediaLinks.twitter")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.socialMediaLinks?.twitter && (
            <p className="text-red-400 text-sm mt-1">{errors.socialMediaLinks.twitter.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="copyrightText" className="text-white/90">
            Copyright Text
          </Label>
          <Input
            id="copyrightText"
            {...register("copyrightText")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.copyrightText && <p className="text-red-400 text-sm mt-1">{errors.copyrightText.message}</p>}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Content...
          </>
        ) : (
          "Save Content"
        )}
      </Button>
    </form>
  )
}
