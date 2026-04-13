import { motion } from "motion/react";
import { Mail, MapPin, Send, FileText } from "lucide-react";
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

const ContactInfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 p-2 rounded-lg bg-brand-orange/10">
      <Icon className="h-5 w-5 text-brand-orange" />
    </div>
    <div>
      <div className="text-white font-bold mb-1">{label}</div>
      <div className="text-gray-400 text-sm">{value}</div>
    </div>
  </div>
);

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    details: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch("https://formspree.io/antonarnauts@a2trails.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Contact Form Submission from ${formData.name}`
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: "",
          email: "",
          projectType: "",
          details: ""
        });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 bg-brand-dark min-h-screen">
      <SEO 
        title={t('nav.contact')}
        description={t('contact.subtitle')}
        canonical="https://a2trails.com/contact"
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 space-y-12"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">{t('contact.info')}</h2>
                <div className="space-y-8">
                  <ContactInfoItem 
                    icon={Mail} 
                    label={t('contact.email')} 
                    value="antonarnauts@a2trails.com" 
                  />
                  <ContactInfoItem 
                    icon={MapPin} 
                    label={t('contact.office')} 
                    value="Mariemontkaai 15 1080 Brussel" 
                  />
                  <ContactInfoItem 
                    icon={FileText} 
                    label={t('contact.vat')} 
                    value="BE1024.359.194" 
                  />
                </div>
              </div>

              {/* Office Hours Card */}
              <div className="bg-brand-card p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">{t('contact.hours.title')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('contact.hours.monFri')}</span>
                    <span className="text-white font-medium">{t('contact.hours.hoursRange')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t('contact.hours.weekend')}</span>
                    <span className="text-brand-orange font-medium">{t('contact.hours.closed')}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div className="bg-brand-card p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium"
                    >
                      {t('contact.form.success')}
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium"
                    >
                      Something went wrong. Please try again or email us directly.
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">{t('contact.form.name')}</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        disabled={status === 'sending'}
                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50"
                        placeholder={t('contact.form.namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">{t('contact.form.email')}</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        disabled={status === 'sending'}
                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50"
                        placeholder={t('contact.form.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-300">{t('contact.form.projectType')}</label>
                      <select 
                        name="projectType"
                        required
                        disabled={status === 'sending'}
                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors appearance-none disabled:opacity-50"
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                      >
                        <option value="" disabled>{t('contact.form.projectTypePlaceholder')}</option>
                        <option value="consultancy">{t('nav.consultancy')}</option>
                        <option value="design">{t('nav.design')}</option>
                        <option value="construction">{t('nav.construction')}</option>
                        <option value="designBuild">{t('nav.designBuild')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">{t('contact.form.details')}</label>
                    <textarea 
                      name="details"
                      required
                      disabled={status === 'sending'}
                      rows={6}
                      className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors resize-none disabled:opacity-50"
                      placeholder={t('contact.form.detailsPlaceholder')}
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending...' : t('contact.form.submit')}
                    {status !== 'sending' && <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
