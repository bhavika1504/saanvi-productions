import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
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
    Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
    const [filterType, setFilterType] = useState<'all' | 'casting' | 'contact'>('all');
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
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

    const addTestEvent = async () => {
        try {
            const testEvent = {
                title: "Acting Masterclass",
                subtitle: "Learn from Industry Professionals",
                description: "Join us for an intensive acting workshop where you'll learn the fundamentals of screen acting, character development, and audition techniques. This workshop is designed for aspiring actors who want to break into the film and television industry.",
                date: "March 15, 2025",
                time: "10:00 AM - 4:00 PM",
                location: "Saanvi Studios, Mumbai",
                image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
                category: "Workshop" as const,
                level: "Beginner",
                duration: "6 hours",
                participants: "30 participants",
                price: "₹2,999",
                originalPrice: "₹4,999",
                highlights: [
                    "Learn screen acting techniques",
                    "Character development workshop",
                    "Mock audition sessions",
                    "Industry networking opportunity",
                    "Certificate of completion"
                ],
                instructor: "Rajesh Kumar - 15 years experience",
                rating: 4.8,
                reviews: 124,
                prizes: [
                    "Certificate of Completion",
                    "Portfolio photoshoot session",
                    "Industry contacts database"
                ]
            };
            await eventsService.addEvent(testEvent);
            toast.success('Test event added successfully!');
            fetchEvents();
        } catch (error) {
            console.error(error);
            toast.error('Failed to add test event');
        }
    };

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSubmissions = submissions.filter(s => {
        const matchesSearch =
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.phone.includes(searchQuery) ||
            (s.gender && s.gender.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()));

        if (filterType === 'all') return matchesSearch;
        return matchesSearch && s.type === filterType;
    });

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
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-cta text-white shadow-lg shadow-cta/20' : 'text-black hover:bg-muted'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'events' ? 'bg-cta text-white shadow-lg shadow-cta/20' : 'text-black hover:bg-muted'}`}
                    >
                        <Film className="w-5 h-5" />
                        Events
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'applications' ? 'bg-cta text-white shadow-lg shadow-cta/20' : 'text-black hover:bg-muted'}`}
                    >
                        <Users className="w-5 h-5" />
                        Applications
                    </button>
                </nav>

                <div className="p-6 border-t border-border">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-black hover:text-destructive hover:bg-destructive/10 rounded-xl font-medium transition-colors"
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
                            {activeTab === 'events' ? 'Event' : activeTab === 'applications' ? 'Talent' : 'Studio'} <span className="text-cta">{activeTab === 'events' ? 'Management' : activeTab === 'applications' ? 'Applications' : 'Overview'}</span>
                        </h1>
                        <p className="text-black">
                            {activeTab === 'events' ? 'Add, edit, or remove workshops and talent hunts.' : 'Review and manage talent applications and contact inquiries.'}
                        </p>
                    </div>
                    {activeTab === 'events' && (
                        <div className="flex gap-3">
                            <Button
                                onClick={addTestEvent}
                                variant="outline"
                                className="border-cta/30 text-cta hover:bg-cta/10 px-6 py-6 rounded-2xl"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add Test Event
                            </Button>
                            <Button
                                onClick={() => { setEditingEvent(null); setIsFormOpen(true); }}
                                className="bg-cta hover:bg-cta/90 text-white px-6 py-6 rounded-2xl shadow-lg shadow-cta/20 group"
                            >
                                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                                Add New Event
                            </Button>
                        </div>
                    )}
                </header>

                {/* Filters */}
                <div className="bg-card border border-border p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                        <Input
                            placeholder={activeTab === 'events' ? "Search events..." : "Search by name, email, phone, gender..."}
                            className="pl-10 bg-background border-none ring-1 ring-border focus-visible:ring-cta"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {activeTab === 'applications' && (
                        <div className="flex gap-2 p-1 bg-muted/30 rounded-xl">
                            {(['all', 'casting', 'contact'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === type
                                        ? 'bg-cta text-white shadow-lg shadow-cta/20'
                                        : 'text-black hover:bg-muted hover:text-foreground'
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Film className="w-12 h-12 text-cta animate-pulse" />
                        <p className="text-black font-medium">Synchronizing event data...</p>
                    </div>
                ) : activeTab === 'events' ? (
                    filteredEvents.length === 0 ? (
                        <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                            <Ticket className="w-16 h-16 text-black mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-bold mb-2 text-black">No events active</h3>
                            <p className="text-black mb-6">Start by adding your first cinematic event.</p>
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
                                                            className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg hover:bg-muted font-bold text-black"
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
                                                <div className="flex items-center gap-2 text-xs text-black uppercase font-bold tracking-tight">
                                                    <Calendar className="w-3.5 h-3.5 text-cta" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-black uppercase font-bold tracking-tight">
                                                    <MapPin className="w-3.5 h-3.5 text-cta" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                <div className="text-lg font-bold text-cta">{event.price}</div>
                                                <div className="text-[10px] font-black text-black px-2 py-1 bg-muted rounded uppercase tracking-widest">
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
                                <Users className="w-16 h-16 text-black mx-auto mb-4 opacity-20" />
                                <h3 className="text-xl font-bold mb-2 text-black">No talent inquiries yet</h3>
                                <p className="text-black">Applications from the contact form will appear here.</p>
                            </div>
                        ) : (
                            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                                <Table>
                                    <TableHeader className="bg-muted/30">
                                        <TableRow className="hover:bg-transparent border-border/50">
                                            <TableHead className="w-[250px] text-xs font-bold uppercase tracking-wider text-black pl-6">Candidate</TableHead>
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-black">Contact Info</TableHead>
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-black">Details</TableHead>
                                            <TableHead className="w-[150px] text-xs font-bold uppercase tracking-wider text-black">Date</TableHead>
                                            <TableHead className="w-[100px] text-right text-xs font-bold uppercase tracking-wider text-black pr-6">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredSubmissions.map((sub) => (
                                            <TableRow key={sub.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                                                {/* Candidate Column */}
                                                <TableCell className="pl-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${sub.type === 'casting' ? 'bg-purple-500/10' : 'bg-cta/10'}`}>
                                                            {sub.type === 'casting' ? (
                                                                <Camera className="w-5 h-5 text-purple-500" />
                                                            ) : (
                                                                <Users className="w-5 h-5 text-cta" />
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-base text-foreground line-clamp-1">{sub.name}</span>
                                                            <span className={`text-[10px] font-black uppercase tracking-wider w-fit px-1.5 py-0.5 rounded-md mt-1 ${sub.type === 'casting' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                                {sub.type === 'casting' ? 'CASTING' : 'CONTACT'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Contact Info Column */}
                                                <TableCell className="py-4">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 text-sm text-black">
                                                            <Mail className="w-3.5 h-3.5" />
                                                            <span className="text-foreground/80">{sub.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-black">
                                                            <Phone className="w-3.5 h-3.5" />
                                                            <span className="text-foreground/80">{sub.phone}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Details Column */}
                                                <TableCell className="py-4">
                                                    {sub.type === 'casting' ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {sub.category && (
                                                                <div className="px-2 py-1 bg-black rounded-md text-xs border border-zinc-700/50 text-zinc-300">
                                                                    <span className="text-white mr-1">Category:</span>{sub.category}
                                                                </div>
                                                            )}
                                                            {sub.age && (
                                                                <div className="px-2 py-1 bg-black rounded-md text-xs border border-zinc-700/50 text-zinc-300">
                                                                    <span className="text-white mr-1">Age:</span>{sub.age}
                                                                </div>
                                                            )}
                                                            {sub.gender && (
                                                                <div className="px-2 py-1 bg-black rounded-md text-xs border border-zinc-700/50 text-zinc-300">
                                                                    <span className="text-white mr-1">Gen:</span>{sub.gender}
                                                                </div>
                                                            )}
                                                            {sub.service && (
                                                                <div className="px-2 py-1 bg-black rounded-md text-xs border border-zinc-700/50 text-zinc-300">
                                                                    <span className="text-white mr-1">Role:</span>{sub.service}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-black italic line-clamp-2 max-w-[250px]">
                                                            "{sub.message}"
                                                        </div>
                                                    )}
                                                </TableCell>

                                                {/* Date Column */}
                                                <TableCell className="py-4">
                                                    <div className="flex items-center gap-2 text-sm text-black">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>{sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                                                    </div>
                                                </TableCell>

                                                {/* Actions Column */}
                                                <TableCell className="text-right pr-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {sub.type === 'casting' && sub.photos && sub.photos.length > 0 && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setSelectedSubmission(sub)}
                                                                className="h-8 w-8 p-0 lg:w-auto lg:h-8 lg:px-3 bg-zinc-900/50 border-zinc-700 hover:bg-cta hover:text-white hover:border-cta transition-all group"
                                                            >
                                                                <Camera className="w-3.5 h-3.5 lg:mr-2 group-hover:scale-110 transition-transform" />
                                                                <span className="hidden lg:inline">Photos ({sub.photos.length})</span>
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteSubmission(sub.id!)}
                                                            className="h-8 w-8 text-black hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Dashboard Stats View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-card p-8 rounded-[2rem] border border-border relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cta/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cta/10 transition-all" />
                            <Film className="w-8 h-8 text-cta mb-4" />
                            <div className="text-4xl font-bold font-display text-black">{events.length}</div>
                            <div className="text-sm font-black text-black uppercase tracking-widest mt-1">Active Productions</div>
                        </div>
                        <div className="bg-card p-8 rounded-[2rem] border border-border relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all" />
                            <Users className="w-8 h-8 text-emerald-500 mb-4" />
                            <div className="text-4xl font-bold font-display text-black">{submissions.length}</div>
                            <div className="text-sm font-black text-black uppercase tracking-widest mt-1">Talent Inquiries</div>
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
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[500]"
                            onClick={() => setIsFormOpen(false)}
                        />
                        <div className="fixed inset-0 z-[501] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
                            <div className="relative w-full max-w-7xl h-full max-h-[95vh] flex items-center justify-center pointer-events-auto">
                                <EventForm
                                    key={editingEvent ? `production-edit-${editingEvent.id}` : 'production-new'}
                                    event={editingEvent}
                                    onClose={() => setIsFormOpen(false)}
                                    onSuccess={() => { setIsFormOpen(false); fetchEvents(); }}
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Photo Viewer Modal */}
                {selectedSubmission && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[500]"
                            onClick={() => setSelectedSubmission(null)}
                        />
                        <div className="fixed inset-0 z-[501] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto shadow-2xl"
                            >
                                <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900 z-10">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedSubmission.name}'s Portfolio</h3>
                                        <p className="text-sm text-zinc-400">
                                            {selectedSubmission.photos?.length || 0} photos • {selectedSubmission.category}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(null)} className="rounded-full hover:bg-zinc-800">
                                        <Plus className="w-6 h-6 rotate-45 text-zinc-400" />
                                    </Button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {selectedSubmission.photos?.map((photo, index) => (
                                            <div key={index} className="relative group aspect-[3/4] rounded-xl overflow-hidden bg-zinc-800">
                                                <img
                                                    src={photo}
                                                    alt={`Portfolio ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                                            </div>
                                        ))}
                                    </div>
                                    {selectedSubmission.introduction && (
                                        <div className="mt-8 bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800">
                                            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Introduction</h4>
                                            <p className="text-zinc-300 italic">"{selectedSubmission.introduction}"</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div >
    );
}
