import React, { useEffect, useState } from 'react';
import {
  Layout,
  Globe,
  Settings as SettingsIcon,
  Save,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('footer');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    copyrightText: '© 2025 Your Brand Name',
    contactEmail: 'contact@domain.com',
    footerDescription: '',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    siteName: 'My Professional Admin',
    language: 'English (United States)',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await api.get('/settings');
        if (response?.success && response?.data) {
          setFormData(response.data);
        }
      } catch (err) {
        console.error('Could not load settings');
      }
    };
    fetchInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.post('/settings', formData);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'footer', label: 'Footer', icon: <Layout size={16} /> },
    { id: 'social', label: 'Social Links', icon: <Globe size={16} /> },
    { id: 'general', label: 'Identity', icon: <SettingsIcon size={16} /> },
  ];

  return (
    <div className="min-h-screen  p-6">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
          <p className="text-sm text-slate-500">
            Manage platform configuration and branding
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white border border-slate-200 rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition cursor-pointer
                ${
                  activeTab === tab.id
                    ? 'bg-[#31b8c6] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl w-full"
        >
          <div className="p-8 space-y-10">

            {/* FOOTER */}
            {activeTab === 'footer' && (
              <SectionBlock title="Footer Settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Copyright Text">
                    <Input
                      name="copyrightText"
                      value={formData.copyrightText}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field label="Contact Email">
                    <Input
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                    />
                  </Field>
                </div>

                <Field label="Footer Description">
                  <textarea
                    name="footerDescription"
                    value={formData.footerDescription}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-slate-300 rounded-lg p-4 text-sm resize-none focus:outline-none focus:border-[#31b8c6]"
                  />
                </Field>
              </SectionBlock>
            )}

            {/* SOCIAL */}
            {activeTab === 'social' && (
              <SectionBlock title="Social Links">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Facebook URL">
                    <Input name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} />
                  </Field>
                  <Field label="Instagram URL">
                    <Input name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} />
                  </Field>
                  <Field label="Twitter URL">
                    <Input name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} />
                  </Field>
                  <Field label="LinkedIn URL">
                    <Input name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} />
                  </Field>
                </div>
              </SectionBlock>
            )}

            {/* GENERAL */}
            {activeTab === 'general' && (
              <SectionBlock title="Identity">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Site Name">
                    <Input name="siteName" value={formData.siteName} onChange={handleChange} />
                  </Field>

                  <Field label="Language">
                    <div className="relative">
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full h-11 border border-slate-300 rounded-lg px-4 text-sm appearance-none focus:outline-none focus:border-[#31b8c6]"
                      >
                        <option value="English (United States)">English (US)</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </Field>
                </div>
              </SectionBlock>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 px-8 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl bg-white">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2 text-sm border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 hover:cursor-pointer"
            >
              Discard
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 text-sm bg-[#31b8c6] text-white rounded-lg font-medium disabled:opacity-50 hover:cursor-pointer"
            >
              {isSaving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------- UI Helpers ---------- */

const SectionBlock = ({ title, children }) => (
  <div className="space-y-6">
    <h2 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    {children}
  </div>
);

const Input = ({ name, value, onChange }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    className="w-full h-11 border border-slate-300 rounded-lg px-4 text-sm focus:outline-none focus:border-[#31b8c6]"
  />
);

export default Settings;
