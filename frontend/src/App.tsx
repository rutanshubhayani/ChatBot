import { ChatWidget } from "components/chat/ChatWidget";
import { TooltipProvider } from "components/ui/tooltip";

function App() {
    return (
        <TooltipProvider>
            <div className="h-screen w-full bg-nova-bg text-white overflow-hidden relative selection:bg-nova-primary selection:text-white">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nova-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-nova-secondary/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 md:p-8">
                    <div className="w-full max-w-5xl h-full max-h-[900px] bg-nova-surface backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                        <ChatWidget />
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}

export default App;
