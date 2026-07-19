import localUnitTest from './LocalUnit.test';
import steamProtocolTest from './SteamProtocol.test';

export default function testsuite() {
  localUnitTest();
  steamProtocolTest();
}
