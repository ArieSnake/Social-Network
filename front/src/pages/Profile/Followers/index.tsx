import React, { useEffect, useState } from 'react';
import { IUser } from '../../../lib/types';
import { handleGetFollowers } from '../../../lib/api';
import { BASE_URL, DEFAULT_PIC } from '../../../lib/constant'; // Import BASE_URL

export const Followers: React.FC = () => {
  const [followers, setFollowers] = useState<IUser[]>([]);

  useEffect(() => {
    handleGetFollowers().then(response => {
      if (response.status === 'ok' && response.payload) {
        setFollowers(response.payload as IUser[]);
      }
    });
  }, []);

  return (
    <div className="followers-list">
      <h2>Your Followers</h2>
  
      {followers.map(follower => (
        <div key={follower.id} className="user-item">
          <img 
            src={follower.picture ? BASE_URL + follower.picture : DEFAULT_PIC} 
            alt={`${follower.name}'s profile picture`} 
          />
          <p>{follower.name} {follower.surname}</p>
        </div>
      ))}
    </div>
  );
};
