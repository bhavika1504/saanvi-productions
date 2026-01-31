import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Calendar,
    MapPin,
    Users,
    LayoutDashboard,
    LogOut,
    Clapperboard,
    Film,
    Ticket,
    Star,
    Mail,
    Phone,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Event, eventsService } from '@/lib/eventsService';
import { Submission, submissionsService } from '@/lib/submissionsService';
import { EventForm } from '@/components/admin/EventForm';
import { Link, useNavigate } from 'react-router-dom';

type Tab = 'dashboard' | 'events' | 'applications';

export default function AdminDashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('events');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'events') fetchEvents();
        if (activeTab === 'applications') fetchSubmissions();
    }, [activeTab]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await eventsService.getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const data = await submissionsService.getAllSubmissions();
            setSubmissions(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch applications');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await eventsService.deleteEvent(id);
            toast.success('Event deleted');
            fetchEvents();
        } catch (error) {
            toast.error('Failed to delete event');
        }
    };

    const handleDeleteSubmission = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;
        try {
            await submissionsService.deleteSubmission(id);
            toast.success('Application removed');
            fetchSubmissions();
        } catch (error) {
            toast.error('Failed to delete application');
        }
    };

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSubmissions = submissions.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery)
    );

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isFormOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isFormOpen]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Sidebar / Nav */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border hidden lg:flex flex-col z-20">
                <div className="p-8 border-b border-border">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-cta rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                            <Clapperboard className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display text-xl font-bold tracking-tighter text-white">
                            SAANVI <span className="text-cta">ADMIN</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-cta text-white shadow-lg shadow-cta/20' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'events' ? 'bg-cta text-white shadow-lg shadow-cta/20' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <Film className="w-5 h-5" />
                        Events
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'applications' ? 'bg-cta text-white shadow-lg shadow-cta/20' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <Users className="w-5 h-5" />
                        Applications
                    </button>
                </nav>

                <div className="p-6 border-t border-border">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl font-medium transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Exit Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold font-display mb-2">
                            {activeTab === 'events' ? 'Event' : activeTab === 'applications' ? 'Registration' : 'Studio'} <span className="text-cta">{activeTab === 'events' ? 'Management' : activeTab === 'applications' ? 'Inquiries' : 'Overview'}</span>
                        </h1>
                        <p className="text-muted-foreground">
                            {activeTab === 'events' ? 'Add, edit, or remove workshops and talent hunts.' : 'Review and manage talent inquiries and registrations.'}
                        </p>
                    </div>
                    {activeTab === 'events' && (
                        <Button
                            onClick={() => { setEditingEvent(null); setIsFormOpen(true); }}
                            className="bg-cta hover:bg-cta/90 text-white px-6 py-6 rounded-2xl shadow-lg shadow-cta/20 group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                            Add New Event
                        </Button>
                    )}
                </header>

                {/* Filters */}
                <div className="bg-card border border-border p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={activeTab === 'events' ? "Search events..." : "Search by name, email, or phone..."}
                            className="pl-10 bg-background border-none ring-1 ring-border focus-visible:ring-cta"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Film className="w-12 h-12 text-cta animate-pulse" />
                        <p className="text-muted-foreground font-medium">Synchronizing event data...</p>
                    </div>
                ) : activeTab === 'events' ? (
                    filteredEvents.length === 0 ? (
                        <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                            <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-bold mb-2 text-white">No events active</h3>
                            <p className="text-muted-foreground mb-6">Start by adding your first cinematic event.</p>
                            <Button variant="outline" onClick={() => { setEditingEvent(null); setIsFormOpen(true); }} className="border-cta/20 text-cta hover:bg-cta hover:text-white">
                                Add Event
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredEvents.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="group relative bg-card/50 border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cta/10 transition-all duration-500"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={event.image || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80'}
                                                alt={event.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-cta text-white">
                                                    {event.category}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="p-2 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-cta transition-colors">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 bg-card border-border shadow-2xl">
                                                        <DropdownMenuItem
                                                            onClick={() => { setEditingEvent(event); setIsFormOpen(true); }}
                                                            className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg hover:bg-muted font-bold text-white"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-cta" /> Edit Event
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteEvent(event.id!)}
                                                            className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg text-destructive hover:bg-destructive/10 font-bold"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Delete Event
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex justify-between items-start gap-4 mb-4">
                                                <h3 className="text-xl font-bold font-display line-clamp-1 text-white">{event.title}</h3>
                                                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                                    <Star className="w-3 h-3 fill-current" /> {event.rating}
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-tight">
                                                    <Calendar className="w-3.5 h-3.5 text-cta" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-tight">
                                                    <MapPin className="w-3.5 h-3.5 text-cta" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                <div className="text-lg font-bold text-cta">{event.price}</div>
                                                <div className="text-[10px] font-black text-muted-foreground px-2 py-1 bg-muted rounded uppercase tracking-widest">
                                                    {event.level}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )
                ) : activeTab === 'applications' ? (
                    <div className="space-y-4">
                        {filteredSubmissions.length === 0 ? (
                            <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-border font-bold">
                                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                                <h3 className="text-xl font-bold mb-2 text-white">No talent inquiries yet</h3>
                                <p className="text-muted-foreground">Applications from the contact form will appear here.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredSubmissions.map((sub) => (
                                    <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-card p-6 rounded-3xl border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-cta/10 rounded-2xl flex items-center justify-center">
                                                <Users className="w-6 h-6 text-cta" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                                    <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {sub.email}</div>
                                                    <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {sub.phone}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 max-w-xl bg-muted/30 p-4 rounded-2xl text-sm italic text-zinc-300 border border-border/50">
                                            "{sub.message}"
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                {sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteSubmission(sub.id!)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Dashboard Stats View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-card p-8 rounded-[2rem] border border-border relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cta/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cta/10 transition-all" />
                            <Film className="w-8 h-8 text-cta mb-4" />
                            <div className="text-4xl font-bold font-display text-white">{events.length}</div>
                            <div className="text-sm font-black text-muted-foreground uppercase tracking-widest mt-1">Active Productions</div>
                        </div>
                        <div className="bg-card p-8 rounded-[2rem] border border-border relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all" />
                            <Users className="w-8 h-8 text-emerald-500 mb-4" />
                            <div className="text-4xl font-bold font-display text-white">{submissions.length}</div>
                            <div className="text-sm font-black text-muted-foreground uppercase tracking-widest mt-1">Talent Inquiries</div>
                        </div>
                        <div className="bg-cta p-8 rounded-[2rem] border border-cta relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('events')}>
                            <Clapperboard className="w-8 h-8 text-white mb-4" />
                            <div className="text-xl font-bold font-display text-white uppercase tracking-tight">Launch New Take</div>
                            <div className="text-sm font-medium text-white/70 mt-1">Click to jump to studio</div>
                        </div>
                    </div>
                )}
            </main>

            {/* Premium Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[500] flex items-start justify-center overflow-y-auto p-4 md:p-10 custom-scrollbar">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[-1]"
                            onClick={() => setIsFormOpen(false)}
                        />
                        <div className="relative w-full max-w-6xl my-auto">
                            <EventForm
                                key={editingEvent ? `production-edit-${editingEvent.id}` : 'production-new'}
                                event={editingEvent}
                                onClose={() => setIsFormOpen(false)}
                                onSuccess={() => { setIsFormOpen(false); fetchEvents(); }}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
