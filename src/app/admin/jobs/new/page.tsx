"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  X, 
  Plus, 
  Trash2,
  Briefcase,
  MapPin,
  Users,
  FileText
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockAdminUser } from "@/lib/auth";

interface FormData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isRemote: boolean;
}

export default function NewJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    description: "",
    requirements: [""],
    responsibilities: [""],
    isRemote: false,
  });

  const departmentOptions = [
    "Engineering",
    "Art",
    "Design",
    "Marketing",
    "Business",
    "QA",
    "Production",
    "Audio",
    "Writing",
  ];

  const jobTypeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof FormData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: keyof FormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Transform form data to match database schema
      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        type: formData.type,
        description: formData.description,
        requirements: formData.requirements.filter(r => r.trim()),
        responsibilities: formData.responsibilities.filter(r => r.trim()),
        is_remote: formData.isRemote
      };

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      // Redirect to jobs list
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error saving job:", error);
      alert('Failed to save job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Post New Job</h1>
            <p className="text-gray-400">
              Create a new job opening for your studio.
            </p>
          </div>
          <Link
            href="/admin/jobs"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Link>
        </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-blue-400" />
            <span>Job Information</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Department *</label>
              <select
                required
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select department</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Los Angeles, CA"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Job Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobTypeOptions.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isRemote}
                  onChange={(e) => handleInputChange("isRemote", e.target.checked)}
                  className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">Remote position available</span>
              </label>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Job Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job description"
              />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-400" />
            <span>Requirements</span>
          </h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Requirements</label>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter requirement"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("requirements", index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("requirements")}
              className="btn-secondary text-sm inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Requirement</span>
            </button>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-400" />
            <span>Responsibilities</span>
          </h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Responsibilities</label>
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter responsibility"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("responsibilities", index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("responsibilities")}
              className="btn-secondary text-sm inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Responsibility</span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/jobs"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isLoading ? "Saving..." : "Post Job"}</span>
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
} 