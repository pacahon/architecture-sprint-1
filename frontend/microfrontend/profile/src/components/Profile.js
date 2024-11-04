import React from 'react';

import './Profile.css';


import {CurrentUserContext} from 'shared-library';
import api from "../utils/api";
import EditAvatarPopup from "./EditAvatarPopup";

// Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
React.useEffect(() => {
    api
        .getAppInfo()
        .then(([userData]) => {
            setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
}, []);


function Profile() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);

    const currentUser = React.useContext(CurrentUserContext);

    const imageStyle = {backgroundImage: `url(${currentUser.avatar})`};

    function onEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    function onEditProfile() {
        setIsEditProfilePopupOpen(true);
    }

    function onAddPlace() {
        setIsAddPlacePopupOpen(true);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                // FIXME: Не понятно как шарить между микрофронтендами
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
    }

    return (
        <>
        <section className="profile page__section">
            <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
    <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
    />
        </>
    );
}

export default Profile;
