/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DemoRequestButton() {
	const handleFormSubmit = (event: any) => {
		event.preventDefault();
		console.log('Form submitted!');
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="text-[#FF6B00] border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-full hidden sm:flex">
					Request a Demo
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Request a Demo</DialogTitle>
					<DialogDescription>See how My AirPlay can help your business. Fill out the form and we&apos;ll be in touch shortly.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="name" className="text-left">
							Name
						</Label>
						{/* --- MODIFIED HERE --- */}
						<Input id="name" required className="col-span-2 h-12 px-4" />
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="email" className="text-left">
							Email
						</Label>
						{/* --- MODIFIED HERE --- */}
						<Input id="email" type="email" required className="col-span-1 h-12 px-4" />
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="company" className="text-left">
							Company
						</Label>
						{/* --- MODIFIED HERE --- */}
						<Input id="company" className="col-span-1 h-12 px-4" />
					</div>
					<Button type="submit" className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90">
						Submit Request
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
