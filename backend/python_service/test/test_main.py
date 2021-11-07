import unittest


class MainTest(unittest.TestCase):

    # Returns True or False.
    def test_main_func(self):
        from ...python_service.main import main_func

        self.assertRaises(Exception, main_func())


if __name__ == "__main__":
    unittest.main()
