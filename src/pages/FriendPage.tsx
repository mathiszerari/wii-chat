import { useEffect, useState } from "react";
import FriendRequest from "../types/friend-request";
import { dateFormater } from "../utils/dateFormater";
import FriendRequestCard from "../components/friend-request-card";
import { fetchFriendRequests } from "../service/friend-request.service";

export default function FriendPage() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      async function loadFriendRequests() {
        const requests = await fetchFriendRequests();
        setFriendRequests(requests);
      }

      loadFriendRequests();

      friendRequests.forEach((d) => {
        d.requestedAt = dateFormater(d.requestedAt);
      })
    }
  
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>Friend Page</h1>

      <div className="border m-6 p-4 bg-blue-100 rounded-3xl">
        <div className="border rounded-3xl p-4 bg-blue-50">

          <span className="mx-16 my-6 text-2xl font-bold">Friends Requests</span>

          {friendRequests.map((request) => (
            <FriendRequestCard key={request.id} {...request} />
          ))}
        </div>
      </div>
    </div>
  );
}