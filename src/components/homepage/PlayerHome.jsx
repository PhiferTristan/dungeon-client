import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../managers/UserManager";

export const PlayerHome = ({token, currentUserId}) => {


    const navigate = useNavigate();

    return (
        <>
        <div>
            <div>
                <p>Current User ID: {currentUserId}</p>
            </div>
        </div>
        </>
    )
}