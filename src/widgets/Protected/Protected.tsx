import type React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../shared/api/supabaseClient";

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ignore = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!ignore) {
        if (!session) {
          navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, {
            replace: true,
          });
        } else {
          setReady(true);
        }
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, {
          replace: true,
        });
      } else {
        setReady(true);
      }
    });

    return () => {
      ignore = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);
  if (!ready) return null;
  return children;
};

export default Protected;
