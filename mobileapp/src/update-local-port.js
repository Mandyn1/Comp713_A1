import fs from 'fs';
import port from '../../port-numbers.json' with { type: 'json' };

const portData = {
  gateway:port.gateway,
  address:port.hostAddress
};

try {
  console.log("Updating Mobile Address Values")

  fs.writeFileSync('./local-port-numbers.json', JSON.stringify(portData, null, 2), 'utf8');

  console.log('Values Updated Successfully');
  
} catch (error) {
  console.error(error);
}
