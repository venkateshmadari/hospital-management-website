import {
  Heart,
  Brain,
  Bone,
  Baby,
  Users,
  Zap,
  Activity,
  Droplets,
  Wind,
  UserCheck,
  Shield,
} from "lucide-react";
import { IoIosBody } from "react-icons/io";

const specialities = [
  {
    value: "generalPhysician",
    label: "General Physician",
    icon: UserCheck,
    description:
      "Comprehensive primary care for all ages, from routine check-ups to managing chronic conditions and preventive healthcare.",
  },
  {
    value: "cardiology",
    label: "Cardiology",
    icon: Heart,
    description:
      "Specialized care for heart and cardiovascular conditions including hypertension, heart disease, and arrhythmias.",
  },
  {
    value: "neurology",
    label: "Neurology",
    icon: Brain,
    description:
      "Expert diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system.",
  },
  {
    value: "orthopedics",
    label: "Orthopedics",
    icon: Bone,
    description:
      "Comprehensive care for musculoskeletal injuries, joint problems, and bone disorders.",
  },
  {
    value: "pediatrics",
    label: "Pediatrics",
    icon: Baby,
    description:
      "Specialized medical care for infants, children, and adolescents focusing on developmental needs.",
  },
  {
    value: "gynecology",
    label: "Gynecology",
    icon: Users,
    description:
      "Women's health services including reproductive health, preventive screenings, and hormonal care.",
  },
  {
    value: "oncology",
    label: "Oncology",
    icon: Shield,
    description:
      "Comprehensive cancer care including diagnosis, treatment, and supportive therapies.",
  },
  {
    value: "gastroenterology",
    label: "Gastroenterology",
    icon: Activity,
    description:
      "Expert care for digestive system disorders including stomach, intestinal, and liver conditions.",
  },
  {
    value: "urology",
    label: "Urology",
    icon: Zap,
    description:
      "Specialized treatment for urinary tract issues and male reproductive system health.",
  },
  {
    value: "pulmonology",
    label: "Pulmonology",
    icon: Wind,
    description:
      "Focused care for respiratory conditions including asthma, COPD, and lung diseases.",
  },
  {
    value: "nephrology",
    label: "Nephrology",
    icon: Droplets,
    description:
      "Expert management of kidney disorders, dialysis care, and hypertension related to renal function.",
  },
  {
    value: "dermatology",
    label: "Dermatology",
    icon: IoIosBody,
    description:
      "Specialized care for skin, hair, and nail conditions including acne, eczema, and skin cancer screening.",
  },
];

const SpecialitiesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-violet-600">Medical Specialities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of medical specialties, each
            staffed with experienced and certified healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {specialities.map((specialty) => {
            const IconComponent = specialty.icon;
            return (
              <div
                key={specialty.value}
                className="cursor-pointer rounded-2xl border p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start flex-col space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 mt-5">
                    <h3 className="font-semibold text-lg mb-1">
                      {specialty.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialitiesSection;
