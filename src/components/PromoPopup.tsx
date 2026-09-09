"use client";

import { useState, useEffect } from 'react';
import { X, Wine, Gift } from 'lucide-react';

export function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('promo-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo-dismissed', '1');
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="promo-backdrop" onClick={handleClose} />
      <div className="promo-popup">
        <button className="promo-close" onClick={handleClose} aria-label="Fermer">
          <X size={20} />
        </button>

        <div className="promo-header">
          <Wine size={36} className="promo-headerIcon" />
          <h2 className="promo-title">Offre Spéciale</h2>
          <p className="promo-subtitle">Pour toute commande à emporter sur notre site</p>
        </div>

        <div className="promo-offers">
          <div className="promo-offerCard">
            <div className="promo-offerIcon">
              <Gift size={24} />
            </div>
            <div className="promo-offerText">
              <span className="promo-offerThreshold">Dès CHF 50.–</span>
              <span className="promo-offerReward">
                1 bouteille de vin genevois <strong>50cl</strong> offerte
              </span>
            </div>
          </div>

          <div className="promo-offerCard promo-offerCard--premium">
            <div className="promo-offerIcon">
              <Wine size={24} />
            </div>
            <div className="promo-offerText">
              <span className="promo-offerThreshold">Dès CHF 80.–</span>
              <span className="promo-offerReward">
                1 bouteille de vin genevois <strong>75cl</strong> offerte
              </span>
            </div>
          </div>
        </div>

        <p className="promo-footer">
          Offre valable uniquement pour les commandes à emporter passées sur notre site
        </p>

        <button className="promo-cta" onClick={handleClose}>
          {"J'en profite !"}
        </button>
      </div>
    </>
  );
}
