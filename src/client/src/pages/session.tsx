import React, { useEffect, useState } from 'react';
import axios from '../common/api/axios';
import Header from '../common/components/header';
import Button from '../common/components/button';
import SelectUserBox from '../common/components/select-user-box';

const SessionPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [latestSession, setLatestSession] = useState(false);

  useEffect(() => {
    axios.get('/session/latest').then((response) => {
      setLatestSession(response.data);

      if (!response.data) {
        axios.get('/user/all').then((response) => {
          if (response.data) {
            setUsers(response.data);
          }
        });
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

  const renderSessionAlreadyExist = () => {
    return (
      <div className="session-page">
        <div className="no-session">
          <h2>
            Ho Ho Ho <span>Chef Snacks</span>, volgens mij heb jij al een sessie gestart.
          </h2>
          <h3>Snacken is leuk, maar we moeten niet te dik worden</h3>
        </div>
      </div>
    );
  };

  return latestSession ? (
    renderSessionAlreadyExist()
  ) : (
    <div className="session-page">
      <Header title="Nieuwe sessie aanmaken" cart={false} />
      <div className="select-users-overview grid">
        <div className="select-users__top">
          <p className="section-title">Selecteer welke medewerkers op kantoor zijn</p>
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
