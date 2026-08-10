import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { 
  Shield, Plus, Trash, Edit, Grid, 
  Phone, FileText, LogOut, Save, X, AlertCircle, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroData, ContactData, ServiceData, ProjectData } from '../data';

interface AdminDashboardProps {
  onLogout: () => void;
  heroData: HeroData;
  contactData: ContactData;
  services: ServiceData[];
  projects: ProjectData[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  heroData,
  contactData,
  services,
  projects,
}) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'contact' | 'projects' | 'services'>('projects');
  const [noti, setNoti] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Forms state
  const [heroForm, setHeroForm] = useState<HeroData>({ ...heroData });
  const [contactForm, setContactForm] = useState<ContactData>({ ...contactData });

  // Projects CRUD state
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    imageUrl: '',
    liveUrl: '',
    order: 1,
  });

  // Services CRUD state
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    desc: '',
    order: 1,
  });

  const showNoti = (type: 'success' | 'error', msg: string) => {
    setNoti({ type, msg });
    setTimeout(() => setNoti(null), 4000);
  };

  // Save Hero Data
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "settings", "hero"), {
        badge: heroForm.badge || '',
        headline: heroForm.headline || '',
        highlight: heroForm.highlight || '',
        desc: heroForm.desc || '',
      });
      showNoti('success', 'Hero text settings updated successfully.');
    } catch (err: any) {
      console.error(err);
      showNoti('error', err.message || 'Failed to update hero settings.');
    } finally {
      setLoading(false);
    }
  };

  // Save Contact Data
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "settings", "contact"), {
        whatsapp: contactForm.whatsapp || '',
        phone: contactForm.phone || '',
        email: contactForm.email || '',
        address: contactForm.address || '',
        linkedin: contactForm.linkedin || '',
        github: contactForm.github || '',
        instagram: contactForm.instagram || '',
        resumeUrl: contactForm.resumeUrl || '',
      });
      showNoti('success', 'Contact settings updated successfully.');
    } catch (err: any) {
      console.error(err);
      showNoti('error', err.message || 'Failed to update contact settings.');
    } finally {
      setLoading(false);
    }
  };

  // Project Actions
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: '',
      imageUrl: '',
      liveUrl: '',
      order: projects.length + 1,
    });
    setIsProjectFormOpen(true);
  };

  const handleOpenEditProject = (proj: ProjectData) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      imageUrl: proj.imageUrl,
      liveUrl: proj.liveUrl || '',
      order: proj.order || 1,
    });
    setIsProjectFormOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        title: projectForm.title,
        category: projectForm.category,
        imageUrl: projectForm.imageUrl,
        liveUrl: projectForm.liveUrl,
        order: Number(projectForm.order),
      };

      if (editingProject && editingProject.id) {
        await setDoc(doc(db, "portfolio", editingProject.id), data);
        showNoti('success', `Project "${data.title}" updated.`);
      } else {
        await addDoc(collection(db, "portfolio"), data);
        showNoti('success', `Project "${data.title}" added.`);
      }
      setIsProjectFormOpen(false);
    } catch (err: any) {
      console.error(err);
      showNoti('error', 'Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      await deleteDoc(doc(db, "portfolio", id));
      showNoti('success', `Project "${title}" deleted.`);
    } catch (err: any) {
      console.error(err);
      showNoti('error', 'Failed to delete project.');
    }
  };

  // Service Actions
  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceForm({
      name: '',
      desc: '',
      order: services.length + 1,
    });
    setIsServiceFormOpen(true);
  };

  const handleOpenEditService = (srv: ServiceData) => {
    setEditingService(srv);
    setServiceForm({
      name: srv.name,
      desc: srv.desc,
      order: srv.order || 1,
    });
    setIsServiceFormOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name: serviceForm.name,
        desc: serviceForm.desc,
        order: Number(serviceForm.order),
      };

      if (editingService && editingService.id) {
        await setDoc(doc(db, "sectors", editingService.id), data);
        showNoti('success', `Service "${data.name}" updated.`);
      } else {
        await addDoc(collection(db, "sectors"), data);
        showNoti('success', `Service "${data.name}" added.`);
      }
      setIsServiceFormOpen(false);
    } catch (err: any) {
      console.error(err);
      showNoti('error', 'Failed to save service.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete service "${name}"?`)) return;
    try {
      await deleteDoc(doc(db, "sectors", id));
      showNoti('success', `Service "${name}" deleted.`);
    } catch (err: any) {
      console.error(err);
      showNoti('error', 'Failed to delete service.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col md:flex-row font-inter relative overflow-x-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {noti && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl border flex gap-3 items-center max-w-sm ${
              noti.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs font-semibold">{noti.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar navigation */}
      <aside className="w-full md:w-72 bg-black border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="p-2 bg-gradient-to-tr from-[#4B1013] to-[#9c1535] rounded-xl text-white">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold tracking-[0.25em] uppercase text-white">
              PORTFOLIO<span className="text-[#E289E5] font-light">ADMIN</span>
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all w-full min-w-[130px] ${
                activeTab === 'projects' ? 'bg-[#9c1535]/15 text-[#E289E5] border border-[#9c1535]/30' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all w-full min-w-[130px] ${
                activeTab === 'services' ? 'bg-[#9c1535]/15 text-[#E289E5] border border-[#9c1535]/30' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Services</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('hero');
                setHeroForm({ ...heroData });
              }}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all w-full min-w-[130px] ${
                activeTab === 'hero' ? 'bg-[#9c1535]/15 text-[#E289E5] border border-[#9c1535]/30' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Hero Text</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('contact');
                setContactForm({ ...contactData });
              }}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all w-full min-w-[130px] ${
                activeTab === 'contact' ? 'bg-[#9c1535]/15 text-[#E289E5] border border-[#9c1535]/30' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Contacts</span>
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-3 px-4 py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider rounded-xl transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-10 md:h-screen md:overflow-y-auto">
        
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-[0.1em] uppercase">Manage Projects</h2>
                <p className="text-xs text-zinc-500 mt-1">Add, update, or remove portfolio items in real-time.</p>
              </div>
              <button
                onClick={handleOpenAddProject}
                className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg hover:scale-[1.02] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Project Form */}
            {isProjectFormOpen && (
              <form onSubmit={handleSaveProject} className="bg-black/40 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#E289E5]">
                    {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsProjectFormOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. OceanFresh"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Category</label>
                    <input
                      type="text"
                      required
                      value={projectForm.category}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g. Seafood E-Commerce Web Application"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Image URL</label>
                    <input
                      type="text"
                      required
                      value={projectForm.imageUrl}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="e.g. /oceanfresh-main.png"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Live Project URL</label>
                    <input
                      type="text"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                      placeholder="e.g. https://github.com/dashboard"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Display Sequence Order</label>
                    <input
                      type="number"
                      required
                      value={projectForm.order}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, order: Number(e.target.value) }))}
                      placeholder="1"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsProjectFormOpen(false)}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:bg-white/5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Project</span>
                  </button>
                </div>
              </form>
            )}

            {/* Project List */}
            <div className="bg-black/35 border border-white/10 rounded-2xl p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                    <th className="pb-3">Project Details</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-center">Order</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj, idx) => (
                    <tr key={proj.id || idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-semibold text-sm flex items-center gap-3.5">
                        <img src={proj.imageUrl} className="w-12 h-8 rounded-lg object-cover bg-zinc-900 border border-white/10" />
                        <div>
                          <div className="text-white font-medium">{proj.title}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5 truncate max-w-xs">{proj.liveUrl}</div>
                        </div>
                      </td>
                      <td className="py-4 text-xs text-zinc-400">{proj.category}</td>
                      <td className="py-4 text-xs text-zinc-400 text-center">{proj.order || idx + 1}</td>
                      <td className="py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleOpenEditProject(proj)}
                            className="p-2 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {proj.id && (
                            <button
                              onClick={() => handleDeleteProject(proj.id!, proj.title)}
                              className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-xs text-zinc-500">No custom portfolio items configured in database. Fallback mock data active.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-[0.1em] uppercase">Manage Services</h2>
                <p className="text-xs text-zinc-500 mt-1">Configure service descriptions and layout order.</p>
              </div>
              <button
                onClick={handleOpenAddService}
                className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg hover:scale-[1.02] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {/* Service Form */}
            {isServiceFormOpen && (
              <form onSubmit={handleSaveService} className="bg-black/40 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#E289E5]">
                    {editingService ? `Edit Service: ${editingService.name}` : 'Add New Service'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsServiceFormOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Service Name</label>
                      <input
                        type="text"
                        required
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Web & Mobile App Development"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Display Sequence Order</label>
                      <input
                        type="number"
                        required
                        value={serviceForm.order}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, order: Number(e.target.value) }))}
                        placeholder="1"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Description</label>
                    <textarea
                      rows={4}
                      required
                      value={serviceForm.desc}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, desc: e.target.value }))}
                      placeholder="Service details..."
                      className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsServiceFormOpen(false)}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:bg-white/5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Service</span>
                  </button>
                </div>
              </form>
            )}

            {/* Service List */}
            <div className="bg-black/35 border border-white/10 rounded-2xl p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                    <th className="pb-3">Service Name</th>
                    <th className="pb-3">Description</th>
                    <th className="pb-3 text-center">Order</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((srv, idx) => (
                    <tr key={srv.id || idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-semibold text-sm text-white max-w-[200px] truncate">{srv.name}</td>
                      <td className="py-4 text-xs text-zinc-400 max-w-sm truncate">{srv.desc}</td>
                      <td className="py-4 text-xs text-zinc-400 text-center">{srv.order || idx + 1}</td>
                      <td className="py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleOpenEditService(srv)}
                            className="p-2 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {srv.id && (
                            <button
                              onClick={() => handleDeleteService(srv.id!, srv.name)}
                              className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-xs text-zinc-500">No custom sectors configured. Default fallbacks active.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HERO EDIT TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.1em] uppercase">Configure Hero Section</h2>
              <p className="text-xs text-zinc-500 mt-1">Update main headline texts, badges, and bios instantaneously.</p>
            </div>

            <form onSubmit={handleSaveHero} className="bg-black/35 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-5">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Badge Title</label>
                <input
                  type="text"
                  value={heroForm.badge || ''}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, badge: e.target.value }))}
                  placeholder="e.g. Web & Mobile App Developer"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Intro Headline</label>
                  <input
                    type="text"
                    value={heroForm.headline || ''}
                    onChange={(e) => setHeroForm(prev => ({ ...prev, headline: e.target.value }))}
                    placeholder="e.g. Hi,"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Highlight Name</label>
                  <input
                    type="text"
                    value={heroForm.highlight || ''}
                    onChange={(e) => setHeroForm(prev => ({ ...prev, highlight: e.target.value }))}
                    placeholder="e.g. I'm Dhaksina Moorthy B"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Description / About Bio</label>
                <textarea
                  rows={8}
                  value={heroForm.desc || ''}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, desc: e.target.value }))}
                  placeholder="Enter biography description..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white p-4 rounded-xl outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Hero Texts</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CONTACT EDIT TAB */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.1em] uppercase">Configure Contact Details</h2>
              <p className="text-xs text-zinc-500 mt-1">Manage public URLs, addresses, and chat links.</p>
            </div>

            <form onSubmit={handleSaveContact} className="bg-black/35 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">WhatsApp Number (e.g. 918939184324)</label>
                  <input
                    type="text"
                    value={contactForm.whatsapp || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="91xxxxxxxxxx"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Phone Display</label>
                  <input
                    type="text"
                    value={contactForm.phone || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 xxxxx xxxxx"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={contactForm.email || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. dharsna2004@gmail.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Resume PDF path / Link</label>
                  <input
                    type="text"
                    value={contactForm.resumeUrl || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, resumeUrl: e.target.value }))}
                    placeholder="e.g. /resume.pdf"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Github URL</label>
                  <input
                    type="text"
                    value={contactForm.github || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, github: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Linkedin URL</label>
                  <input
                    type="text"
                    value={contactForm.linkedin || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Instagram URL</label>
                  <input
                    type="text"
                    value={contactForm.instagram || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, instagram: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-2 font-semibold">Office Address</label>
                  <input
                    type="text"
                    value={contactForm.address || ''}
                    onChange={(e) => setContactForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="City, State, Country"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white px-4 py-2.5 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Contact Info</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
