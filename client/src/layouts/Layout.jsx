
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Navigation />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
