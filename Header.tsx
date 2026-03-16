import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-brandMark" style={{ width: '200px', height: 'auto' }}>
                <img src="path/to/logo.png" alt="Logo" />
            </div>
            {/* Removed span elements for brand title and subtitle */}
        </header>
    );
};

export default Header;