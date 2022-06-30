import React, { useState } from 'react';
import axios from '../common/api/axios';
import Header from '../common/components/header';
import Button from '../common/components/button';
import SelectUserBox from '../common/components/select-user-box';
import Loader from '../common/components/loader';
import useFetch from '../common/hooks/useFetch';

const SessionPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { data: latestSession, loading } = useFetch('/session/latest');
  const { data: users } = useFetch('/user/all');

  const createNewSession = () => {
    if (selectedUsers.length > 0) {
      axios.post('/session/new', selectedUsers).then((response) => {
        if (response.data) {
          window.location.href = '/dashboard';
        }
      });
    }
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
        <div className="execption-message">
          <h2>
            Ho Ho Ho <span>Chef Snacks</span>, volgens mij heb jij al een sessie gestart.
          </h2>
          <h3>Snacken is leuk, maar we moeten niet te dik worden</h3>
        </div>
      </div>
    );
  };

  if (latestSession !== null && latestSession.session !== null) return renderSessionAlreadyExist();

  return (
    <div className="session-page">
      <Header title="Nieuwe sessie aanmaken" cart={false} />
      <div className="select-users-overview grid">
        <div className="select-users__top">
          <p className="section-title">Selecteer welke medewerkers op kantoor zijn</p>
          <Button size="medium" text="Sessie aanmaken" color="red" onClick={createNewSession} />
        </div>
        <div className="select-users__grid">
          {users?.map((user, index) => {
            return <SelectUserBox key={index} user={user} onSelect={selectUser} onDeselect={deselectUser} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
