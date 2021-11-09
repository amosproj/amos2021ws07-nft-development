import unittest
from backend.python_service.service import main_func


class MainTest(unittest.TestCase):

    # Returns True or False.
    def test_main_func(self):
        self.assertRaises(Exception, main_func())


if __name__ == "__main__":
    unittest.main()
