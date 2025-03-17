"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
import addData from "../firebase/firestore/addData";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export default function DashboardPage() {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  // const collectionRef = collection(db, "users");
  // const querySnapshot = await getDocs(collectionRef);
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });
  // const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // setList(data);
  // console.log("data", data);<
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks")); // Get users collection
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Store document ID
          ...doc.data(), // Merge document data
        }));
        setList(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, [user]);
  return (
    <div>
      Dashboards
      <div>
        {list &&
          list.map((item) => (
            <div>
              <h1>{item.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
