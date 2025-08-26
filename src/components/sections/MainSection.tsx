import { Calendar, Clock, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const MainSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-violet-500/20 via-white to-violet-500/20 min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary backdrop-blur-sm px-4 py-2 rounded-full text-primary text-xs font-medium">
                  <Stethoscope className="w-4 h-4" />
                  Trusted Healthcare Provider
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Book Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary  via-violet-800 to-primary bg-clip-text text-transparent">
                    Medical Appointment
                  </span>
                  <br />
                  <span className="text-foreground">Today</span>
                </h1>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  Experience world-class healthcare with our expert specialists.
                  Schedule your appointment online in just a few clicks.
                </p>
              </div>

              <Button className="rounded-xl cursor-pointer">
                <Calendar className="w-5 h-5 mr-1" />
                Book Appointment
              </Button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Patients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">
                    Expert Doctors
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">
                    Emergency Care
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-violet-100 to-violet-200">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent"></div>
                <img
                  src={
                    "https://i.pinimg.com/736x/a0/d6/5a/a0d65a2d7811ca48d680e9045eabda5c.jpg"
                  }
                  alt="Modern hospital facility with caring medical staff"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-violet-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Quick Booking</div>
                    <div className="text-xs text-muted-foreground">
                      In 2 minutes
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border border-violet-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Expert Care</div>
                    <div className="text-xs text-muted-foreground">
                      Certified Doctors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
