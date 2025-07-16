"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Save, 
  X, 
  Plus, 
  Trash2,
  Briefcase,
  MapPin,
  Users,
  FileText,
  Loader2
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
  status: string;
}

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    description: "",
    requirements: [""],
    responsibilities: [""],
    isRemote: false,
    status: "active"
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

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const job = await response.json();
        
        setFormData({
          title: job.title || "",
          department: job.department || "",
          location: job.location || "",
          type: job.type || "full-time",
          description: job.description || "",
          requirements: job.requirements && job.requirements.length > 0 ? job.requirements : [""],
          responsibilities: job.responsibilities && job.responsibilities.length > 0 ? job.responsibilities : [""],
          isRemote: job.is_remote || false,
          status: job.status || "active"
        });
      } catch (error) {
        console.error("Error fetching job:", error);
        alert('Failed to load job. Please try again.');
      } finally {
        setIsFetching(false);
      }
    };

    if (slug) {
      fetchJob();
    }
  }, [slug]);

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
        is_remote: formData.isRemote,
        status: formData.status
      };

      const response = await fetch(`/api/jobs/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      // Redirect to jobs list
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      alert('Failed to update job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <AdminLayout user={mockAdminUser}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading job...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Edit Job</h1>
            <p className="text-gray-400">
              Update the job posting: {formData.title}
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
                {jobTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isRemote"
                checked={formData.isRemote}
                onChange={(e) => handleInputChange("isRemote", e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <label htmlFor="isRemote" className="text-sm font-medium">
                Remote position
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-400" />
            <span>Job Description</span>
          </h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              required
              rows={8}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the role, responsibilities, and what makes this position exciting..."
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-400" />
            <span>Requirements</span>
          </h2>
          
          <div className="space-y-4">
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter requirement"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("requirements", index)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("requirements")}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Requirement</span>
            </button>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-orange-400" />
            <span>Responsibilities</span>
          </h2>
          
          <div className="space-y-4">
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter responsibility"
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("responsibilities", index)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("responsibilities")}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Responsibility</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/admin/jobs"
            className="btn-secondary"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isLoading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
} 