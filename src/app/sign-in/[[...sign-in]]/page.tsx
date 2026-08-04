import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="flex justify-center items-center py-24 bg-gray-50">
			<SignIn />
		</div>
	);
}
