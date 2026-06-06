import React, { useEffect, useState } from 'react';
import {
  Layout,
  Globe,
  Settings as SettingsIcon,
  Save,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
  Loader2,
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

  // ---- Security / change password ----
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPwd, setShowPwd] = useState({ current: false, next: false, confirm: false });
  const [changingPwd, setChangingPwd] = useState(false);

  const handlePwdChange = (e) => {
    const { name, value } = e.target;
    setPwd((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwd.newPassword.length < 6) return toast.error('New password must be at least 6 characters');
    if (pwd.newPassword !== pwd.confirmPassword) return toast.error('Passwords do not match');
    setChangingPwd(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: pwd.currentPassword,
        newPassword: pwd.newPassword,
      });
      toast.success('Password changed successfully');
      setPwd({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to change password');
    } finally {
      setChangingPwd(false);
    }
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
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
  ];

  return (
    <div className="min-h-screen  p-6">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="text-sm text-slate-400">
            Manage platform configuration and branding
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition cursor-pointer
                ${
                  activeTab === tab.id
                    ? 'bg-[#DC2626] text-white'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Security panel */}
        {activeTab === 'security' && (
          <form
            onSubmit={handleChangePassword}
            className="bg-white/5 border border-white/10 rounded-xl w-full max-w-xl"
          >
            <div className="p-8">
              <SectionBlock title="Change Password">
                <div className="space-y-6">
                  <Field label="Current Password">
                    <PasswordInput
                      name="currentPassword"
                      value={pwd.currentPassword}
                      onChange={handlePwdChange}
                      show={showPwd.current}
                      onToggle={() => setShowPwd((s) => ({ ...s, current: !s.current }))}
                    />
                  </Field>
                  <Field label="New Password">
                    <PasswordInput
                      name="newPassword"
                      value={pwd.newPassword}
                      onChange={handlePwdChange}
                      show={showPwd.next}
                      onToggle={() => setShowPwd((s) => ({ ...s, next: !s.next }))}
                    />
                    <p className="text-xs text-slate-500 mt-1">Minimum 6 characters.</p>
                  </Field>
                  <Field label="Confirm New Password">
                    <PasswordInput
                      name="confirmPassword"
                      value={pwd.confirmPassword}
                      onChange={handlePwdChange}
                      show={showPwd.confirm}
                      onToggle={() => setShowPwd((s) => ({ ...s, confirm: !s.confirm }))}
                    />
                  </Field>
                </div>
              </SectionBlock>
            </div>
            <div className="flex justify-end gap-3 px-8 py-4 border-t border-white/10 bg-white/5 rounded-b-xl">
              <button
                type="submit"
                disabled={changingPwd || !pwd.currentPassword || !pwd.newPassword}
                className="inline-flex items-center gap-2 px-6 py-2 text-sm bg-[#DC2626] text-white rounded-lg font-medium disabled:opacity-50 hover:cursor-pointer"
              >
                {changingPwd ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
                {changingPwd ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </form>
        )}

        {/* Main Card */}
        {activeTab !== 'security' && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-xl w-full"
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
                    className="w-full border border-white/10 rounded-lg p-4 text-sm resize-none focus:outline-none focus:border-[#DC2626]"
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
                        className="w-full h-11 border border-white/10 rounded-lg px-4 text-sm appearance-none focus:outline-none focus:border-[#DC2626]"
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
          <div className="flex justify-end gap-3 px-8 py-4 border-t border-white/10 bg-white/5 rounded-b-xl bg-white/5">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2 text-sm border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:cursor-pointer"
            >
              Discard
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 text-sm bg-[#DC2626] text-white rounded-lg font-medium disabled:opacity-50 hover:cursor-pointer"
            >
              {isSaving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

/* ---------- UI Helpers ---------- */

const SectionBlock = ({ title, children }) => (
  <div className="space-y-6">
    <h2 className="text-sm font-semibold text-slate-200 border-b border-white/10 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-200">{label}</label>
    {children}
  </div>
);

const Input = ({ name, value, onChange }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    className="w-full h-11 border border-white/10 rounded-lg px-4 text-sm focus:outline-none focus:border-[#DC2626]"
  />
);

const PasswordInput = ({ name, value, onChange, show, onToggle }) => (
  <div className="relative">
    <input
      type={show ? 'text' : 'password'}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="w-full h-11 border border-white/10 rounded-lg pl-4 pr-11 text-sm text-white focus:outline-none focus:border-[#DC2626]"
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
      tabIndex={-1}
    >
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  </div>
);

export default Settings;
