import React, {useState} from "react";
import styled from 'styled-components'
import CreditHolidays from 'appVTBch/CreditHolidays';


const WidgetWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-40%, -50%);
  border: solid 1px;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => {
  const [widgetOpen, setWidgetOpen] = useState(true)
  const toggleWidgetView = () => setWidgetOpen(!widgetOpen)
  
  return (
    <>
    <button onClick={toggleWidgetView}> {widgetOpen ? 'Скрыть' : 'Показать'} </button>
    <WidgetWrapper>
        {
          widgetOpen ? (
            <>
              <React.Suspense fallback={<div>NOTHING IMPORTED</div>}>
                <CreditHolidays/>
              </React.Suspense>
            </>
          ) : null
        }
    </WidgetWrapper>
    </>
  );
};

export default App;
