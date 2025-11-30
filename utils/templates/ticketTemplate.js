export const ticketTemplate = ({ fullName, seatNumber, category }) => `
  <div style="
    font-family: 'Inter', 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    max-width: 550px;
    margin: 0 auto;
    background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
    padding: 4px;
    border-radius: 25px;
    border: 2px solid #8B4513;
  ">
    <div style="
      background: #FFF8E1;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(139, 69, 19, 0.25);
    ">

      <!-- Header with Brand Identity -->
      <div style="
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
        color: #FFF8E1;
        padding: 45px 35px;
        text-align: center;
        position: relative;
        border-bottom: 3px solid #D2691E;
      ">
        <!-- Decorative Pattern -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,215,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,215,0,0.1) 0%, transparent 50%);
          pointer-events: none;
        "></div>
        
        <!-- Brand Logo Layout -->
        <div style="position: relative; z-index: 2;">
          <div style="
            margin-bottom: 25px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(255, 215, 0, 0.3);
            backdrop-filter: blur(10px);
          ">
            <!-- TASTES OF CULTURE -->
            <div style="
              font-size: 18px;
              font-weight: 300;
              letter-spacing: 3px;
              color: #FFD700;
              margin-bottom: 8px;
              text-transform: uppercase;
            ">TASTES OF</div>
            
            <div style="
              font-size: 18px;
              font-weight: 300;
              letter-spacing: 3px;
              color: #FFD700;
              margin-bottom: 15px;
              text-transform: uppercase;
            ">CULTURE</div>
            
            <!-- ORIKI Main Brand -->
            <div style="
              font-size: 52px;
              font-weight: 800;
              color: #FFF8E1;
              letter-spacing: 2px;
              margin-bottom: 10px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
              line-height: 1;
            ">ORIKI</div>
            
            <!-- Tagline -->
            <div style="
              font-size: 16px;
              font-weight: 400;
              color: #FFD700;
              letter-spacing: 1px;
              font-style: italic;
              border-top: 1px solid rgba(255, 215, 0, 0.3);
              padding-top: 12px;
            ">A Royal Dining Experience!</div>
          </div>
          
          <!-- Ticket Badge -->
          <div style="
            display: inline-block;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #8B4513;
            padding: 14px 32px;
            border-radius: 30px;
            font-size: 15px;
            font-weight: 800;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
            border: 2px solid #FFF8E1;
          ">
            🎟️ Digital Ticket Confirmed
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div style="padding: 45px 40px; background: #FFF8E1;">

        <!-- Welcome Section -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="
            width: 90px;
            height: 90px;
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
            font-size: 36px;
            color: #FFD700;
            border: 3px solid #FFD700;
            box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
          ">✓</div>
          
          <h2 style="
            margin: 0 0 15px 0;
            font-size: 32px;
            font-weight: 700;
            color: #fffff0;
            background: linear-gradient(135deg, #8B4513, #A0522D);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">Welcome, ${fullName}!</h2>
          
          <p style="
            margin: 0;
            color: #A0522D;
            font-size: 18px;
            line-height: 1.6;
            font-weight: 500;
          ">Your royal culinary journey awaits at ÒRIKÌ 2025</p>
        </div>

        <!-- Reservation Details -->
        <div style="
          background: linear-gradient(135deg, #FFFFFF 0%, #FFF8E1 100%);
          border-radius: 20px;
          padding: 35px 30px;
          margin-bottom: 40px;
          border: 2px solid #D2691E;
          box-shadow: 0 8px 30px rgba(139, 69, 19, 0.15);
          position: relative;
          overflow: hidden;
        ">
          <!-- Decorative Corner -->
          <div style="
            position: absolute;
            top: -1px;
            right: -1px;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border-bottom-left-radius: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            padding: 12px;
            color: #FFD700;
            font-size: 20px;
          ">👑</div>
          
          <h3 style="
            margin: 0 0 30px 0;
            font-size: 18px;
            font-weight: 700;
            color: #8B4513;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
            border-bottom: 2px solid #FFD700;
            padding-bottom: 15px;
          ">Reservation Details</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 25px;">
            <div style="text-align: center;">
              <div style="
                background: linear-gradient(135deg, #8B4513, #A0522D);
                color: #FFD700;
                padding: 12px 18px;
                border-radius: 15px;
                margin-bottom: 15px;
                font-size: 13px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                border: 1px solid #D2691E;
              ">Seat Number</div>
              <p style="
                margin: 0;
                font-size: 28px;
                font-weight: 800;
                color: #8B4513;
                text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.2);
              ">${seatNumber}</p>
            </div>
            
            <div style="text-align: center;">
              <div style="
                background: linear-gradient(135deg, #8B4513, #A0522D);
                color: #FFD700;
                padding: 12px 18px;
                border-radius: 15px;
                margin-bottom: 15px;
                font-size: 13px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                border: 1px solid #D2691E;
              ">Experience Tier</div>
              <p style="
                margin: 0;
                font-size: 28px;
                font-weight: 800;
                color: #8B4513;
                text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.2);
              ">${category}</p>
            </div>
          </div>
        </div>

        <!-- QR Code Download Section -->
        <div style="
          background: linear-gradient(135deg, #FFE4B5 0%, #FFD700 100%);
          border-radius: 20px;
          padding: 40px 35px;
          margin-bottom: 35px;
          border: 3px solid #8B4513;
          text-align: center;
          position: relative;
          overflow: hidden;
        ">
          <!-- Pattern Overlay -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 30% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
            pointer-events: none;
          "></div>
          
          <div style="position: relative; z-index: 2;">
            <div style="
              width: 80px;
              height: 80px;
              background: #8B4513;
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 25px;
              font-size: 32px;
              color: #FFD700;
              border: 3px solid #8B4513;
            ">📎</div>
            
            <h3 style="
              margin: 0 0 20px 0;
              font-size: 26px;
              font-weight: 800;
              color: #8B4513;
              text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
            ">Your Digital Entry Pass</h3>
            
            <p style="
              margin: 0 0 30px 0;
              color: #8B4513;
              font-size: 17px;
              line-height: 1.7;
              font-weight: 600;
            ">
              <strong>QR Code Attached:</strong> Look for "qrcode.png" below<br/>
              Save it to your phone or show the attachment at arrival
            </p>
            
            <div style="
              display: inline-block;
              background: linear-gradient(135deg, #8B4513, #A0522D);
              color: #FFD700;
              padding: 18px 40px;
              border-radius: 50px;
              font-size: 17px;
              font-weight: 800;
              text-decoration: none;
              letter-spacing: 1px;
              box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
              border: 2px solid #FFD700;
              text-transform: uppercase;
            ">
              ⬇️ Download QR Code Below
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div style="
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          border-radius: 18px;
          padding: 35px 30px;
          border: 2px solid #FFD700;
          color: #FFF8E1;
        ">
          <h4 style="
            margin: 0 0 25px 0;
            font-size: 20px;
            font-weight: 700;
            color: #FFD700;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          ">🎯 Entry Instructions</h4>
          
          <div style="display: grid; gap: 20px;">
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="
                width: 40px;
                height: 40px;
                background: #FFD700;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                color: #8B4513;
                flex-shrink: 0;
              ">1</div>
              <div style="flex: 1;">
                <strong style="color: #FFD700;">Locate Attachment:</strong> Find "qrcode.png" file in this email
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="
                width: 40px;
                height: 40px;
                background: #FFD700;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                color: #8B4513;
                flex-shrink: 0;
              ">2</div>
              <div style="flex: 1;">
                <strong style="color: #FFD700;">Save to Device:</strong> Download and save the QR code to your phone
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="
                width: 40px;
                height: 40px;
                background: #FFD700;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                color: #8B4513;
                flex-shrink: 0;
              ">3</div>
              <div style="flex: 1;">
                <strong style="color: #FFD700;">Present at Venue:</strong> Show the QR code for scanning at entrance
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="
                width: 40px;
                height: 40px;
                background: #FFD700;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                color: #8B4513;
                flex-shrink: 0;
              ">4</div>
              <div style="flex: 1;">
                <strong style="color: #FFD700;">Enjoy Experience:</strong> Proceed to seat <strong>${seatNumber}</strong> for your royal dining journey
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div style="
        background: linear-gradient(135deg, #654321 0%, #8B4513 100%);
        color: #FFF8E1;
        padding: 40px 35px;
        text-align: center;
        border-top: 3px solid #FFD700;
        position: relative;
      ">
        <!-- Decorative Pattern -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(45deg, transparent 48%, rgba(255,215,0,0.1) 50%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(255,215,0,0.1) 50%, transparent 52%);
          background-size: 20px 20px;
          pointer-events: none;
          opacity: 0.3;
        "></div>
        
        <div style="position: relative; z-index: 2;">
          <p style="
            margin: 0 0 20px 0;
            font-size: 16px;
            font-weight: 600;
            color: #FFD700;
            letter-spacing: 1px;
            text-transform: uppercase;
          ">
            TASTES OF CULTURE PRESENTS
          </p>
          
          <div style="
            font-size: 32px;
            font-weight: 800;
            color: #FFF8E1;
            letter-spacing: 2px;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          ">ORIKI</div>
          
          <p style="
            margin: 0 0 25px 0;
            font-size: 15px;
            font-weight: 500;
            color: #FFD700;
            font-style: italic;
          ">A Royal Dining Experience!</p>
          
          <div style="
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid rgba(255, 215, 0, 0.3);
          ">
            <p style="
              margin: 0 0 10px 0;
              font-size: 13px;
              opacity: 0.9;
            ">
              Celebrating Nigeria's Heritage Through Food, Culture & Entertainment
            </p>
            <p style="
              margin: 0;
              font-size: 12px;
              opacity: 0.8;
            ">
              Need assistance? Contact us at support@oriki2025.com
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
`;
