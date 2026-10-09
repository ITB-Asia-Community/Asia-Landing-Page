import { useQuery } from "@tanstack/react-query";
import type {
	Event,
	ForumThread,
	Freelance,
	Lomba,
	Member,
	Showcase,
} from "@/lib/types";
import freelanceData from "@/data/freelance.json";
import lombaData from "@/data/lomba.json";
import eventData from "@/data/event.json";
import forumData from "@/data/forum.json";
import showcaseData from "@/data/showcase.json";
import memberData from "@/data/member.json";

export const freelanceList = freelanceData as Freelance[];
export const lombaList = lombaData as Lomba[];
export const eventList = eventData as Event[];
export const forumList = forumData as ForumThread[];
export const showcaseList = showcaseData as Showcase[];
export const memberList = memberData as Member[];

export function useFreelance() {
	return useQuery({
		queryKey: ["freelance"],
		queryFn: (): Promise<Freelance[]> => Promise.resolve(freelanceList),
	});
}

export function useFreelanceById(id: string) {
	return useQuery({
		queryKey: ["freelance", id],
		queryFn: (): Promise<Freelance | undefined> =>
			Promise.resolve(freelanceList.find((item) => item.id === id)),
		enabled: Boolean(id),
	});
}

export function useLomba() {
	return useQuery({
		queryKey: ["lomba"],
		queryFn: (): Promise<Lomba[]> => Promise.resolve(lombaList),
	});
}

export function useLombaById(id: string) {
	return useQuery({
		queryKey: ["lomba", id],
		queryFn: (): Promise<Lomba | undefined> =>
			Promise.resolve(lombaList.find((item) => item.id === id)),
		enabled: Boolean(id),
	});
}

export function useEvent() {
	return useQuery({
		queryKey: ["event"],
		queryFn: (): Promise<Event[]> => Promise.resolve(eventList),
	});
}

export function useEventById(id: string) {
	return useQuery({
		queryKey: ["event", id],
		queryFn: (): Promise<Event | undefined> =>
			Promise.resolve(eventList.find((item) => item.id === id)),
		enabled: Boolean(id),
	});
}

export function useForum() {
	return useQuery({
		queryKey: ["forum"],
		queryFn: (): Promise<ForumThread[]> => Promise.resolve(forumList),
	});
}

export function useForumById(id: string) {
	return useQuery({
		queryKey: ["forum", id],
		queryFn: (): Promise<ForumThread | undefined> =>
			Promise.resolve(forumList.find((item) => item.id === id)),
		enabled: Boolean(id),
	});
}

export function useShowcase() {
	return useQuery({
		queryKey: ["showcase"],
		queryFn: (): Promise<Showcase[]> => Promise.resolve(showcaseList),
	});
}

export function useShowcaseById(id: string) {
	return useQuery({
		queryKey: ["showcase", id],
		queryFn: (): Promise<Showcase | undefined> =>
			Promise.resolve(showcaseList.find((item) => item.id === id)),
		enabled: Boolean(id),
	});
}

export function useMember() {
	return useQuery({
		queryKey: ["member"],
		queryFn: (): Promise<Member[]> => Promise.resolve(memberList),
	});
}

export function useMemberById(id: string) {
	return useQuery({
		queryKey: ["member", id],
		queryFn: (): Promise<Member | undefined> =>
			Promise.resolve(memberList.find((item) => item.id === id)),
		enabled: Boolean(id),
	});
}
