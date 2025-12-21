import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Pagination from '../components/Pagination';
import toast from 'react-hot-toast';
import DeleteModal from '../components/DeleteModal';
import api from '../api';
import { useEffect } from 'react';
import { DateHelper } from '../utils/dateTimeHelper';

const NewsletterAdminPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [formData, setFormData] = useState({
        subject: "",
        message: "",
        useTemplate: false,
        sendToAll: "",
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [totalData, setTotalData] = useState(0)

    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    const [emails, setEmails] = useState([])
    // const emails = Array.from({ length: 8 }, (_, i) => ({
    //     id: i + 1,
    //     email: `user${i + 1}@gmail.com`,
    //     date: `2025-09-${(i % 30) + 1}`,
    //     status: i % 2 === 0 ? 'Active' : 'Inactive'
    // }));

    const toggleSelect = (email) => {
        setSelectedEmails((prev) =>
            prev.includes(email)
                ? prev.filter((e) => e !== email)
                : [...prev, email]
        );
    };

    const fetchEmails = async () => {
        try {
            const { data } = await api.get(`/newsletter`)
            setEmails(data?.results || [])
            setTotalPages(data?.totalPages)
            setTotalData(data?.total)
        } catch (error) {
            toast.error("Faild to Fetch Emails");
            console.error(error);

        }
    }

    useEffect(() => {
        fetchEmails()
    }, [])

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/newsletter/permanent/${deleteModal?.id}`)
            toast.success("entry deleted")
            setDeleteModal({ id: "", isOpen: false })
            fetchEmails()
        } catch (error) {
            toast.error("faild to delete ")
        }
    };

    const handleSend = async (e) => {
        e.preventDefault()

        try {
            if ((selectedEmails.length === 0 && !formData.sendToAll) || !formData.subject) {
                toast.error('Select users and fill subject/message');
                return;
            }
            setIsLoading(true)
            const res = await api.post("/newsletter/sendmail", { ...formData, emails: selectedEmails })
            toast.success('Mail sent succefully');
        } catch (error) {
            toast.error("Faild to send email")
        } finally {
            setIsLoading(false)
        }


    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="w-full min-h-screen bg-white p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Newsletter
                </h1>
                <p className="text-sm text-slate-500">
                    Manage subscribers and send emails
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT: LIST + PAGINATION */}
                <div className="lg:col-span-7 flex flex-col gap-3">

                    <div className="border border-slate-200 rounded-lg bg-white flex flex-col h-[calc(100vh-150px)]">
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-slate-200">
                            <h2 className="font-medium text-slate-800">
                                Subscribers List
                            </h2>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto flex-1">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="px-4 py-3">Select</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-y-auto">
                                    {emails.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-slate-200 hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedEmails.includes(item.email)}
                                                    onChange={() => toggleSelect(item.email)}
                                                    className='h-4 w-4 cursor-pointer '
                                                />
                                            </td>
                                            <td className="px-4 py-3">{item.email}</td>
                                            <td className="px-4 py-3">{DateHelper(item?.createdAt)}</td>
                                            <td className="px-4 py-3">{item?.isBlocked ? "Block" : "Active"}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => { setDeleteModal({ id: item?._id, isOpen: true }) }}
                                                    className="text-slate-500 hover:text-red-600"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="border-t border-slate-200">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalData={totalData}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="lg:col-span-5 border border-slate-200 rounded-lg bg-white h-[calc(100vh-150px)] flex flex-col">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <h2 className="font-medium text-slate-800">Send Newsletter</h2>
                            <p className="text-xs text-slate-500">Selected: {selectedEmails.length}</p>
                        </div>

                        <label className="inline-flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                checked={formData.sendToAll}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, sendToAll: e.target.checked }))
                                }
                                className="form-checkbox h-5 w-5 rounded-full  border-slate-300 text-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30 transition-all cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 font-medium">Send to all</span>
                        </label>

                    </div>


                    {/* Form */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-4 flex-1 overflow-y-auto">
                            <input
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#31b8c6] transition-colors"
                            />

                            <textarea
                                rows={6}
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#31b8c6] transition-colors"
                            />


                            {/* Use Template Checkbox */}
                            <label className="inline-flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    checked={formData.useTemplate}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, useTemplate: e.target.checked }))
                                    }
                                    className="h-5 w-5 rounded-full border-2 border-[#31b8c6] text-white checked:bg-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30 transition-all cursor-pointer"
                                />
                                <span className="text-sm text-slate-700 font-medium">Use Template</span>
                            </label>
                        </div>
                        <button
                            onClick={handleSend}
                            className="w-full py-3 bg-[#31b8c6] text-white rounded-md mt-4 cursor-pointer hover:bg-slate-100 hover:text-slate-900 hover:border-1"
                        >
                            {isLoading ? "Sending..." : "Send mail"}
                        </button>
                    </div>

                </div>

            </div>

            <DeleteModal
                isOpen={deleteModal.isOpen}
                loading={isDeleting}
                onClose={() => setDeleteModal({ isOpen: false, id: null })}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default NewsletterAdminPage;
