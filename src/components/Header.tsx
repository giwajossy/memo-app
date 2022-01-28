import React from "react"
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const Header: React.FC = (): JSX.Element => {
    return (
        <header>
            <h1>
                <span>
                    <EmojiObjectsIcon fontSize="large" />
                </span>
                Memo App
            </h1>

        </header>
    )
}

export default Header

