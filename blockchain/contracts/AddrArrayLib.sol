pragma solidity ^0.8.0;



library AddrArrayLib {
	using AddrArrayLib for Addresses;

	struct Addresses {
		address[] _items;
	}

	function pushAddress(Addresses storage self, address element) internal returns(bool){
		if(!exists(self, element)){
			self._items.push(element);
			return true;
		}
		return false;
	}

	function removeAddress(Addresses storage self, address element) internal returns(bool){
		for(uint i = 0; i < self.size(); i++) {
			if (self._items[i] == element) {
				self._items[i] = self._items[self.size() -1];
				self._items.pop();
				return true;
			}
		}
		return false;
	}

	function getAddressAtIndex(Addresses storage self, uint index) internal view returns(address){
		require(index < size(self), "Index is out of range.");
		return self._items[index];
	}

	function size(Addresses storage self) internal view returns(uint256) {
		return self._items.length;
	}

	function exists(Addresses storage self, address element) internal view returns(bool){
		for(uint i = 0; i < self.size();i++){
			if (self._items[i] == element) {
				return true;
			}
		}
		return false;
	}
}
