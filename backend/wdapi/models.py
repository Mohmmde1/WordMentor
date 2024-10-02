class BaseTwinwordData:
    """A base class to represent data coming back from Twinword API
    and transform it to Python types."""

    def __init__(self, data):
        """Data is the raw JSON/dict returned from Twinword"""
        self.data = data

    def check_for_detail_data_key(self, key):
        """Some keys are only in the detail response, raise an
        exception if the key is not found."""
        if key not in self.data:
            raise AttributeError(
                f"{key} is not in data, please make sure this is a detail response."
            )

    def __str__(self):
        return f"Entry: {self.entry}, Author: {self.author}, Email: {self.email}, Result Code: {self.result_code}, Result Message: {self.result_msg}, Version: {self.version}"

    @property
    def author(self):
        self.check_for_detail_data_key("author")
        return self.data["author"]

    @property
    def email(self):
        self.check_for_detail_data_key("email")
        return self.data["email"]

    @property
    def entry(self):
        self.check_for_detail_data_key("entry")
        return self.data["entry"]

    @property
    def request(self):
        self.check_for_detail_data_key("request")
        return self.data["request"]

    @property
    def response(self):
        self.check_for_detail_data_key("response")
        return self.data["response"]

    @property
    def result_code(self):
        self.check_for_detail_data_key("result_code")
        return self.data["result_code"]

    @property
    def result_msg(self):
        self.check_for_detail_data_key("result_msg")
        return self.data["result_msg"]

    @property
    def version(self):
        self.check_for_detail_data_key("version")
        return self.data["version"]


class WdDefinition(BaseTwinwordData):
    """A class to represent word definition data coming back from Twinword API."""

    @property
    def ipa(self):
        self.check_for_detail_data_key("ipa")
        return self.data["ipa"]

    @property
    def meaning(self):
        self.check_for_detail_data_key("meaning")
        return self.data["meaning"]

    def __str__(self):
        return f"Entry: {self.entry}, Author: {self.author}, Email: {self.email}, Result Code: {self.result_code}, Result Message: {self.result_msg}, Version: {self.version}, IPA: {self.ipa}, Meaning: {self.meaning}"


class WdDifficulty(BaseTwinwordData):
    """A class to represent word difficulty data coming back from Twinword API."""

    @property
    def ten_degree(self):
        self.check_for_detail_data_key("ten_degree")
        return int(self.data["ten_degree"])

    def __str__(self):
        return f"Entry: {self.entry}, Author: {self.author}, Email: {self.email}, Result Code: {self.result_code}, Result Message: {self.result_msg}, Version: {self.version}, Ten Degree: {self.ten_degree}"
