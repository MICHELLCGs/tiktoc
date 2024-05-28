import { useState, useEffect } from 'react';
import {
  fetchUsers as fetchUsersAPI,
  createUser as createUserAPI,
  getUser as getUserAPI,
  updateUser as updateUserAPI,
  deleteUser as deleteUserAPI
} from '../api/userService';

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetchUsersAPI();
      setUsers(response.data.users);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await createUserAPI(userData);
      setUsers([...users, response.data.user]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (userId) => {
    setIsLoading(true);
    try {
      const response = await getUserAPI(userId);
      return response.data.user;
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const updateUser = async (userId, userData) => {
    setIsLoading(true);
    try {
      await updateUserAPI(userId, userData);
      setUsers(users.map(user => (user._id === userId ? { ...user, ...userData } : user)));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setIsLoading(true);
    try {
      await deleteUserAPI(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, users, fetchUsers, createUser, getUser, updateUser, deleteUser };
};

export default useUsers;
