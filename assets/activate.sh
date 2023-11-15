./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 rm -rf /var/mobile/Media/Downloads/1

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 rm -rf /var/mobile/Media/1

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 mkdir /var/mobile/Media/Downloads/1

./sshpass -p alpine scp -rP 2222 -o StrictHostKeyChecking=no ~/Desktop/Activation root@localhost:/var/mobile/Media/Downloads/1

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 mv -f /var/mobile/Media/Downloads/1 /var/mobile/Media

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chown -R mobile:mobile /var/mobile/Media/1

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod -R 755 /var/mobile/Media/1

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod 644 /var/mobile/Media/1/Activation/activation_record.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod 644 /var/mobile/Media/1/Activation/data_ark.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod 644 /var/mobile/Media/1/Activation/com.apple.commcenter.device_specific_nobackup.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 killall backboardd sleep 12 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 mv -f /var/mobile/Media/1/Activation/FairPlay /var/mobile/Library/

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod 755 /var/mobile/Library/FairPlay

ACT1=$(./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 find /private/var/containers/Data/System -name internal) 

ACT2=$(./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 find /private/var/containers/Data/System -name activation_records) 

echo $ACT1 

ACT2=${ACT1%?????????????????} 

echo $ACT2 

ACT3=$ACT2/Library/internal

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chflags nouchg $ACT3 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 mv -f /var/mobile/Media/1/Activation/data_ark.plist $ACT3 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod 755 $ACT3 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chflags uchg $ACT3

ACT4=$ACT2/Library/activation_records 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 mkdir $ACT4 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 mv -f /var/mobile/Media/1/Activation/activation_record.plist $ACT4/activation_record.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod 755 $ACT4/activation_record.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chflags uchg $ACT4/activation_record.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chflags nouchg /var/wireless/Library/Preferences/com.apple.commcenter.device_specific_nobackup.plist

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 mv -f /var/mobile/Media/1/Activation/com.apple.commcenter.device_specific_nobackup.plist /var/wireless/Library/Preferences/com.apple.commcenter.device_specific_nobackup.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chown root:mobile /var/wireless/Library/Preferences/com.apple.commcenter.device_specific_nobackup.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chmod 755 /var/wireless/Library/Preferences/com.apple.commcenter.device_specific_nobackup.plist 
./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 chflags uchg /var/wireless/Library/Preferences/com.apple.commcenter.device_specific_nobackup.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 launchctl unload /System/Library/LaunchDaemons/com.apple.mobileactivationd.plist 

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 launchctl load /System/Library/LaunchDaemons/com.apple.mobileactivationd.plist

./sshpass -p alpine ssh -o StrictHostKeyChecking=no root@localhost -p 2222 ldrestart