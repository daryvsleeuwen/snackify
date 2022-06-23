import React, { useEffect, useState, useSyncExternalStore } from 'react';
import axios from '../common/api/axios';
import Header from '../common/components/header';
import Button from '../common/components/button';
import SelectUserBox from '../common/components/select-user-box';

const SessionPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get('/user/all').then((response) => {
      if (response.data) {
        setUsers(response.data);
      }
    });
  }, []);

  const createNewSession = () => {
    axios.post('/session/new', selectedUsers).then((response) => {
      if (response.data) {
        window.location.href = '/dashboard';
      }
    });
  };

  const selectUser = (user: any) => {
    setSelectedUsers([...selectedUsers, user]);
  };

  const deselectUser = (deselected: any) => {
    const filtered = selectedUsers.filter((user) => user.id !== deselected.id);
    setSelectedUsers(filtered);
  };

  return (
    <div className="session-page">
      <Header title="Nieuwe sessie aanmaken" cart={false} />
      <div className="select-users-overview grid">
        <div className="select-users__top">
          <p className="section-title">Selecteer welke medewerkens op kantoor zijn</p>
          <Button size="medium" text="Sessie aanmaken" color="red" onClick={createNewSession} />
        </div>
        <div className="select-users__grid">
          {users.map((user, index) => {
            return <SelectUserBox key={index} user={user} onSelect={selectUser} onDeselect={deselectUser} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
