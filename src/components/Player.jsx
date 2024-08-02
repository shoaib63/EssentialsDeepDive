import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {

    const [PlayerName, setPlayerName] = useState(initialName);
    const [isEditing, SetIsEditing] = useState(false);

    let editablePlayerName = <span className="player-name" >{PlayerName}</span>

    if (isEditing)
        editablePlayerName = <input type="text" defaultValue={PlayerName} required onChange={changeHandler} />

    function HandelEditClick() {
        SetIsEditing((isEditing) => !isEditing);

        onChangeName(symbol, PlayerName)
    }

    function changeHandler(event) {
        setPlayerName(event.target.value);
    }


    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={HandelEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}

