import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);

const PricingTable = (): JSX.Element => {
  const queryParams = useQuery();
  const user_id = queryParams.get('user_id');
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log('User ID:', user_id);

      } catch (error) {
        console.error('Error fetching user information', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user_id]);

  useEffect(() => {

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;

    script.onload = () => {
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="pricing-table">
      <stripe-pricing-table
        pricing-table-id={process.env.REACT_APP_PRICING_TABLE_ID}
        publishable-key={process.env.REACT_APP_PUBLISHABLE_KEY}
        client-reference-id={user_id}
      ></stripe-pricing-table>
    </div>
  );
};

export default PricingTable;
